import { BinaryReader, FieldType, IPacketModel, Location } from "../network/GamePacketModel";
import AbstractPacket from "./AbstractPacket";

export default abstract class ReceivablePacket extends AbstractPacket implements BinaryReader {
  _buffer!: Uint8Array;
  _offset = 0;
  _view!: DataView;

  set Buffer(buffer: Uint8Array) {
    this._buffer = buffer;
    this._view = new DataView(this._buffer.buffer);
  }

  abstract read(): boolean;

  readD(): number {
    const value = this._view.getInt32(this._offset, true);
    this._offset += 4;
    return value;
  }

  readH(): number {
    const value = this._view.getUint16(this._offset, true);
    this._offset += 2;
    return value;
  }

  readC(): number {
    const value = this._view.getUint8(this._offset);
    this._offset += 1;
    return value;
  }

  readF(): number {
    const value = this._view.getFloat64(this._offset, true);
    this._offset += 8;
    return value;
  }

  readQ(): number {
    const lo = this._view.getUint32(this._offset, true);
    const hi = this._view.getUint32(this._offset + 4, true);
    this._offset += 8;
    return lo + this.pow2(32) * hi;
  }

  readS(): string {
    let result = "";
    for (let i = this._offset; i < this._buffer.byteLength - 1; i += 2) {
      const c = this._view.getUint16(i, true);
      this._offset += 2;
      if (c === 0) break;
      result += String.fromCharCode(c);
    }
    return result;
  }

  readB(length: number): Uint8Array {
    const value = this._buffer.slice(this._offset, this._offset + length);
    this._offset += length;
    return Uint8Array.from(value);
  }

  readLoc(): Location {
    return [this.readD(), this.readD(), this.readD()]; // X, Y, Z
  }

  /**
   * Creates an instance of the model and sequentially fills its fields,
   * reading the buffer in the order specified by `order` parameter in @Field(type, order).
   */
  protected readModel<T extends IPacketModel>(Model: new () => T): T {
    const instance = new Model();

    for (const { key, type } of instance.getSchema()) {
      (instance as Record<string, unknown>)[key] = this.readByType(type);
    }

    return instance;
  }

  private readByType(type: FieldType): unknown {
    switch (type) {
      case "C":
        return this.readC();
      case "H":
        return this.readH();
      case "D":
        return this.readD();
      case "Q":
        return this.readQ();
      case "F":
        return this.readF();
      case "S":
        return this.readS();
      case "Loc":
        return this.readLoc();
    }
  }
}
