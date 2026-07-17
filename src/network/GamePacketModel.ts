export type FieldType = "C" | "H" | "D" | "Q" | "F" | "S" | "Loc" | "B";

export type Location = [x: number, y: number, z: number];

export interface BinaryReader {
  readC(): number;
  readH(): number;
  readD(): number;
  /** number type - not bigint. 64-bit unsigned integer, from two Uint32 (lo + hi * 2^32) */
  readQ(): number;
  readF(): number;
  readS(): string;
  readB(length: number): Uint8Array;
  readLoc(): Location;
}

export interface BinaryWriter {
  writeC(val: number): this;
  writeH(val: number): this;
  writeD(val: number): this;
  writeQ(val: number): this;
  writeF(val: number): this;
  writeS(txt: string): this;
  writeB(buf: Uint8Array): this;
  writeLoc(loc: Location): this;
}

type FieldCondition = (value: any) => boolean;
type FieldTransform = (value: any) => any;

/**
 * Scalar field — is read/written using one of the read/write methods.
 * Array field — N instances of a nested PacketModel consecutively, where N is the value
 * of a previously read scalar field (countKey).
 */
export type FieldSpec =
  | { key: string; order: number; kind: "scalar"; type: FieldType; length?: number; condition?: FieldCondition; transform?: FieldTransform; }
  | { key: string; order: number; kind: "nested"; model: new () => IPacketModel; condition?: FieldCondition; transform?: FieldTransform; }
  | {
      key: string;
      order: number;
      kind: "array";
      model: new () => IPacketModel;
      countKey: string;
      condition?: FieldCondition;
      transform?: FieldTransform;
    };

const FIELDS = Symbol("packet:fields");

/**
 * Storing schema on top of the built-in (native) Reflect — without reflect-metadata dependency.
 */
function getOwnFields(target: object): FieldSpec[] {
  const descriptor = Reflect.getOwnPropertyDescriptor(target, FIELDS);
  return (descriptor?.value as FieldSpec[] | undefined) ?? [];
}

function setOwnFields(target: object, fields: FieldSpec[]): void {
  Reflect.defineProperty(target, FIELDS, {
    value: fields,
    configurable: true,
    writable: true,
    enumerable: false,
  });
}

/** Collect fields along the prototype chain — this way, model inheritance also works. */
function collectFields(proto: object | null): FieldSpec[] {
  if (!proto || proto === Object.prototype) return [];
  const own = getOwnFields(proto);
  return [...collectFields(Object.getPrototypeOf(proto)), ...own];
}

function validateOrderUniqueness(
  target: object,
  fields: FieldSpec[],
  newOrder: number,
  propertyKey: string | symbol
): void {
  if (fields.some((f) => f.order === newOrder)) {
    throw new Error(
      `Duplicate field order ${newOrder} on ${target.constructor.name}` + ` (field "${String(propertyKey)}")`
    );
  }
}

type FieldDecoratorOptions = { order?: number; if?: FieldCondition, transform?: FieldTransform };

/**
 * Marks field as readable from the buffer.
 *
 * @param type  the type of reading (corresponds to the read methods of ReceivablePacket)
 * @param order optional explicit order number for reading from the buffer.
 *              If not specified, it is calculated automatically based on the number
 *              of already registered fields in the entire inheritance chain
 *              (parent + already processed fields of this class). Works
 *              because property decorators are guaranteed to execute
 *              top-down in the order of field declarations.
 *
 *              Explicit order should be specified only if you need to arrange
 *              fields in the class in a different order than they appear
 *              in the buffer (for example, for code readability).
 *
 * @example
 * ```ts
 *   class PacketModel extends BasePacketModel {
 *     @C() _id: number;
 *     @D() type: number;
 *     @S() name: string;
 *   }
 * ```
 */
export function Field(
  type: FieldType,
  { order, if: condition, transform }: FieldDecoratorOptions = {}
): PropertyDecorator {
  return (target, propertyKey) => {
    const fields = getOwnFields(target);
    const inherited = collectFields(Object.getPrototypeOf(target)).length;
    const resolvedOrder = order ?? inherited + fields.length;

    validateOrderUniqueness(target, fields, resolvedOrder, propertyKey);


    fields.push({ key: propertyKey as string, kind: "scalar", type, order: resolvedOrder, condition, transform });
    setOwnFields(target, fields);
  };
}

/**
 * Marks field as a fixed-length raw byte array, read via `readB(length)`.
 *
 * @param length number of bytes to read.
 *
 * @example
 * ```ts
 *   class PacketModel extends BasePacketModel {
 *     @C() _id: number;
 *     @B(8) key: Uint8Array;
 *   }
 * ```
 */
export function B(length: number, { order, if: condition, transform }: FieldDecoratorOptions = {}): PropertyDecorator {
  return (target, propertyKey) => {
    const fields = getOwnFields(target);
    const inherited = collectFields(Object.getPrototypeOf(target)).length;
    const resolvedOrder = order ?? inherited + fields.length;

    validateOrderUniqueness(target, fields, resolvedOrder, propertyKey);

    fields.push({ key: propertyKey as string, kind: "scalar", type: "B", length, order: resolvedOrder, condition, transform });
    setOwnFields(target, fields);
  };
}

// Shortcuts for field types, for convenience and readability

export const C = function (options?: FieldDecoratorOptions) { return Field("C", options); };
export const H = function (options?: FieldDecoratorOptions) { return Field("H", options); };
export const D = function (options?: FieldDecoratorOptions) { return Field("D", options); };
export const Q = function (options?: FieldDecoratorOptions) { return Field("Q", options); };
export const F = function (options?: FieldDecoratorOptions) { return Field("F", options); };
export const S = function (options?: FieldDecoratorOptions) { return Field("S", options); };
export const Loc = function (options?: FieldDecoratorOptions) { return Field("Loc", options); };

/**
 * Repeated field — a nested model, read/written N times consecutively,
 * where N is taken from the value of a previously read scalar field of the same model.
 *
 * [!] The declaration order is important: the FieldArray must appear in the schema AFTER
 * the countKey field (i.e., declared earlier in the class), otherwise
 * the count value will not be set at the time of reading the array.
 *
 * @param Model The nested model class.
 * @param countKey The name of the field in the same model that contains the count of items to read.
 * @param options Options for the field decorator.
 *
 * @example
 * ```ts
 *   class BuffModel extends BasePacketModel {
 *     @D() Id: number;
 *     @H() SkillLevel: number;
 *     @D() RemainingTime: number;
 *   }
 *
 *   class PacketModel extends BasePacketModel {
 *     @C() _id: number;
 *     @H() _size: number;
 *     @ArrayModel(BuffModel, "_size") buffs: BuffModel[];
 *   }
 * ```
 */
export function ArrayModel<M extends IPacketModel>(
  Model: new () => M,
  countKey: string,
  { order, if: condition, transform }: FieldDecoratorOptions = {}
): PropertyDecorator {
  return (target, propertyKey) => {
    const fields = getOwnFields(target);
    const inherited = collectFields(Object.getPrototypeOf(target)).length;
    const resolvedOrder = order ?? inherited + fields.length;

    validateOrderUniqueness(target, fields, resolvedOrder, propertyKey);

    fields.push({
      key: propertyKey as string,
      kind: "array",
      model: Model,
      countKey,
      order: resolvedOrder,
      condition,
      transform,
    });
    setOwnFields(target, fields);
  };
}

/**
 * Marks field as a nested model, which is read/written using readModel/writeModel.
 *
 * @param Model The nested model class.
 * @param param1 Options for the field decorator.
 * @returns A property decorator function.
 *
 * @example
 * ```ts
 *   class NestedModel extends BasePacketModel {
 *     @D() Id: number;
 *     @H() SkillLevel: number;
 *     @D() RemainingTime: number;
 *   }
 *
 *   class PacketModel extends BasePacketModel {
 *     @C() _id: number;
 *     @H() _size: number;
 *     @NestedModel(NestedModel) nested: NestedModel;
 *   }
 * ```
 */
export function NestedModel<M extends IPacketModel>(
  Model: new () => M,
  { order, if: condition, transform }: FieldDecoratorOptions = {}
): PropertyDecorator {
  return (target, propertyKey) => {
    const fields = getOwnFields(target);
    const inherited = collectFields(Object.getPrototypeOf(target)).length;
    const resolvedOrder = order ?? inherited + fields.length;

    validateOrderUniqueness(target, fields, resolvedOrder, propertyKey);

    fields.push({
      key: propertyKey as string,
      kind: "nested",
      model: Model,
      order: resolvedOrder,
      condition,
      transform,
    });
    setOwnFields(target, fields);
  };
}

/** Any packet model must be able to provide its schema. */
export interface IPacketModel {
  getSchema(): ReadonlyArray<FieldSpec>;
}

/** Base class for a packet model — just inherit and decorate with @Field. */
export abstract class BasePacketModel implements IPacketModel {
  getSchema(): ReadonlyArray<FieldSpec> {
    const fields = collectFields(Object.getPrototypeOf(this));
    return [...fields].sort((a, b) => a.order - b.order);
  }
}
