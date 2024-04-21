import { TypeSocket } from '@type/enums';

export type User = {
  login: string;
  password: string;
};

export type UserLogin = {
  login: string;
  isLogined: boolean;
};

export type TypeSocketData = User | UserLogin;

export type AnswerError = {
  id: string;
  type: TypeSocket.ERROR;
  payload: {
    error: string;
  };
};

export type SocketData = {
  id: string | null;
  type: TypeSocket;
  payload: {
    user: TypeSocketData;
  };
};
