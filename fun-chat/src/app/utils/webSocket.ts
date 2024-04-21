import { AnswerError, SocketData } from '@type/type';
import { TypeSocket } from '@type/enums';
import { URL } from '@type/value';

export async function webSocket(request: SocketData): Promise<SocketData | AnswerError | undefined> {
  try {
    // Создаем новое соединение с сервером
    const socket: WebSocket = new WebSocket(URL);

    // Обертываем соединение в Promise для удобства использования await
    const socketPromise: Promise<WebSocket> = new Promise((resolve, reject) => {
      socket.onopen = () => resolve(socket);
      socket.onerror = (error) => reject(error);
    });

    // Ожидаем, пока соединение не будет установлено
    const connectedSocket: WebSocket = await socketPromise;

    // Отправляем запрос
    connectedSocket.send(JSON.stringify(request));

    // Ждем ответа от сервера
    const response: SocketData | AnswerError = await new Promise((resolve, reject) => {
      connectedSocket.onmessage = (event) => resolve(JSON.parse(event.data));
      connectedSocket.onerror = (error) => reject(error);
    });

    // Обрабатываем ответ сервера
    console.log('Response from server:', response);

    // Закрываем соединение после получения ответа
    connectedSocket.close();
    return response;
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
