export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type CarTypeApi = {
  name: string;
  color: string;
};

export type WinnerData = {
  id: number;
  wins: number;
  time: number;
};

export type EngineData = {
  velocity: number;
  distance: number;
};

export type EngineAnswer = {
  data: EngineData | string;
  status: number;
};
