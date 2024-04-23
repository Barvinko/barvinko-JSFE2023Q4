import { URL } from '@type/value';
import { SocketData, AnswerError } from '@app/types/type';
import { TypeSocket } from '@type/enums';
import { DisconnectEl } from '@components/disconnect/Disconnect';

export class Socket {
  public static socket: WebSocket;

  private static reLogin: () => Promise<void>;

  public static async createSocet() {
    try {
      Socket.socket = new WebSocket(URL);

      const socketPromise: Promise<WebSocket> = new Promise((resolve, reject) => {
        Socket.socket.onopen = () => resolve(Socket.socket);
        Socket.socket.onerror = (error) => reject(error);
      });

      await socketPromise;

      Socket.socket.onclose = async () => {
        await Socket.reconnection();

        this.reLogin();
      };

      Socket.socket.onerror = async (error) => {
        console.error('WebSocket error:', error);
        await Socket.reconnection();
      };
    } catch {
      await Socket.reconnection();
    }
  }

  public static setEnter(enter: () => Promise<void>) {
    this.reLogin = enter;
  }

  private static async reconnection() {
    DisconnectEl.getContainer().show();
    let connected = false;
    while (!connected) {
      try {
        await this.createSocet();
        connected = true;
        DisconnectEl.getContainer().close();
      } catch (error) {
        console.log('Failed to restore');
      }
    }
  }

  public static async sendRequest(request: SocketData): Promise<SocketData | AnswerError> {
    try {
      Socket.socket.send(JSON.stringify(request));

      return new Promise((resolve, reject) => {
        Socket.socket.onmessage = (event) => resolve(JSON.parse(event.data));
        Socket.socket.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error('WebSocket error:', error);
      return {
        id: '0',
        type: TypeSocket.ERROR,
        payload: {
          error: `error`,
        },
      };
    }
  }
}
