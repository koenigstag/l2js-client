import IStream from "../../mmocore/IStream";

export default class WebSocketAdapter implements IStream {
  private ws!: WebSocket;
  private queue: Uint8Array[] = [];
  private waiting: ((value: Uint8Array) => void) | null = null;
  private timeout = 5000;

  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.ws.close();
        reject(new Error("WebSocket timeout"));
      }, this.timeout);

      this.ws = new WebSocket(this.url);
      this.ws.binaryType = "arraybuffer";

      this.ws.onopen = () => {
        clearTimeout(timer);
        resolve();
      };

      this.ws.onerror = () => {
        clearTimeout(timer);
        reject(new Error("WebSocket error"));
      };

      this.ws.onmessage = (event) => {
        const data = new Uint8Array(event.data as ArrayBuffer);
        if (this.waiting) {
          this.waiting(data);
          this.waiting = null;
        } else {
          this.queue.push(data);
        }
      };
    });
  }

  recv(): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      if (this.ws.readyState !== WebSocket.OPEN) {
        return reject(new Error("Connection is closed"));
      }
      if (this.queue.length > 0) {
        resolve(this.queue.shift()!);
      } else {
        this.waiting = resolve;
      }
    });
  }

  send(bytes: Uint8Array): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(bytes);
        resolve();
      } else {
        reject(new Error("Connection is closed"));
      }
    });
  }

  close(): Promise<void> {
    return new Promise((resolve) => {
      this.ws.onclose = () => resolve();
      this.ws.close();
    });
  }

  toString(): string {
    return this.url;
  }
}
