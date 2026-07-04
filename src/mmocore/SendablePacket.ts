import { BinaryWriter, FieldType, IPacketModel, Location } from "../network/GamePacketModel";
import AbstractPacket from "./AbstractPacket";

export default abstract class SendablePacket extends AbstractPacket implements BinaryWriter {
  static readonly PACKET_MAX_SIZE: number = 4096;
  _buffer: Uint8Array = new Uint8Array(SendablePacket.PACKET_MAX_SIZE);
  _offset = 0;
  _view: DataView = new DataView(this._buffer.buffer);

  get Buffer(): Uint8Array {
    return this._buffer;
  }

  get Position(): number {
    return this._offset;
  }

  set Position(n: number) {
    this._offset = n;
  }

  abstract write(): void;

  writeD(val: number): this {
    this._view.setInt32(this._offset, val, true);
    this._offset += 4;
    return this;
  }

  writeH(val: number): this {
    this._view.setInt16(this._offset, val, true);
    this._offset += 2;
    return this;
  }

  writeC(val: number): this {
    this._view.setInt8(this._offset, val);
    this._offset += 1;
    return this;
  }

  writeF(val: number): this {
    this._view.setFloat64(this._offset, val);
    this._offset += 1;
    return this;
  }

  writeQ(val: number): this {
    const hi = Math.floor(val / this.pow2(32));
    const lo = val - hi * this.pow2(32);

    this._view.setUint32(this._offset, lo, true);
    this._view.setUint32(this._offset + 4, hi, true);
    this._offset += 8;
    return this;
  }

  writeS(txt: string): this {
    if (txt.length > 0) {
      for (let i = 0; i < txt.length; ++i) {
        const c = txt.charCodeAt(i);
        this.writeC(c & 0xff);
        this.writeC((c & 0xff00) >>> 8);
      }
      this.writeH(0);
    }
    return this;
  }

  writeB(buf: Uint8Array): this {
    this._buffer.set(buf, this._offset);
    this._offset += buf.byteLength;
    return this;
  }

  writeLoc(loc: Location): this {
    this.writeD(loc[0]).writeD(loc[1]).writeD(loc[2]);
    return this;
  }

  /**
   * Writes the fields of the model to the buffer in the same order as readModel read them
   * (order from @Field). The model should already be populated with data —
   * writeModel only serializes, it doesn't compute anything.
   */
  protected writeModel<T extends IPacketModel>(instance: T): void {
    const source = instance as unknown as Record<string, unknown>;

    for (const field of instance.getSchema()) {
      if (field.kind === "scalar" && (!field.condition || field.condition(source))) {
        const value = source[field.key];
        this.writeByType(field.type, field.transform ? field.transform(value) : value);
        continue;
      }

      if (field.kind === "nested" && (!field.condition || field.condition(source))) {
        const nestedInstance = source[field.key] as IPacketModel;
        this.writeModel(field.transform ? field.transform(nestedInstance) : nestedInstance);
        continue;
      }

      if (field.kind === "array" && (!field.condition || field.condition(source))) {
        const items = source[field.key] as IPacketModel[];
        for (const item of items) {
          this.writeModel(field.transform ? field.transform(item) : item);
        }
      }
    }
  }

  private writeByType(type: FieldType, value: unknown): void {
    switch (type) {
      case "C":
        this.writeC(value as number);
        return;
      case "H":
        this.writeH(value as number);
        return;
      case "D":
        this.writeD(value as number);
        return;
      case "Q":
        this.writeQ(value as number);
        return;
      case "F":
        this.writeF(value as number);
        return;
      case "S":
        this.writeS(value as string);
        return;
      case "Loc": {
        // Symmetric to readLoc: three Int32 in a row (x, y, z).
        // If the order/types of Loc fields differ in your project, adjust here.
        this.writeLoc(value as Location);
        return;
      }
    }
  }
}
