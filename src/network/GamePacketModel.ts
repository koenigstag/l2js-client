export type FieldType = "C" | "H" | "D" | "Q" | "F" | "S" | "Loc";

export type Location = [x: number, y: number, z: number];

export interface BinaryReader {
  readC(): number;
  readH(): number;
  readD(): number;
  /** number type - not bigint. 64-bit unsigned integer, from two Uint32 (lo + hi * 2^32) */
  readQ(): number;
  readF(): number;
  readS(): string;
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
}

export interface FieldSpec {
  key: string;
  type: FieldType;
  order: number;
}

const FIELDS = Symbol("packet:fields");

interface WithFields {
  [FIELDS]?: FieldSpec[];
}

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

/**
 * Marks a field in the model as readable from the buffer.
 *
 * @param type  the type of reading (corresponds to the read methods of ReceivablePacket)
 * @param order the mandatory explicit order number for reading from the buffer.
 *              Not related to the order of field declarations in the class — you can
 *              group fields in the model as convenient for code readability.
 */
export function Field(type: FieldType, order: number): PropertyDecorator {
  return (target, propertyKey) => {
    const fields: FieldSpec[] = getOwnFields(target);

    if (fields.some((f) => f.order === order)) {
      throw new Error(
        `Duplicate field order ${order} on ${target.constructor.name}` + ` (field "${String(propertyKey)}")`
      );
    }

    fields.push({ key: propertyKey as string, type, order });
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
