import IStream from "../mmocore/IStream";
import MMOConfig from "../mmocore/MMOConfig";
import NetSocket from "./adapters/NetSocket.adapter";
import WebSocketAdapter from "./adapters/WebSocket.adapter";

export default class SocketFactory {
  static getSocketAdapter(config: MMOConfig): IStream {
    const stream: IStream | string = config.Stream;
    if (typeof stream === "object" && "connect" in (stream as any)) {
      return stream as IStream;
    }

    switch (stream) {
      case "auto":
        // is NodeJS
        if (typeof process !== "undefined" && process.release.name === "node") {
          return new NetSocket(config.Ip, config.Port);
        }
        if (typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
          throw new Error("Not yet implemented");
          // return new FireFox();
        }
        break;
      case 'websocket':
        return new WebSocketAdapter( `ws://${config.Ip}:${config.Port}` )
    }

    throw new Error("Cannot find appropriate socket adapter");
  }

}
