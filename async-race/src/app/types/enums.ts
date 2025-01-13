export enum Spans {
  SPAN = 'span',
  H2 = `h2`,
  H3 = `h3`,
}

export enum ApiUrls {
  MAIN = 'http://localhost:3000',
  GARAGE = `${MAIN}/garage/`,
  ENGINE = `${MAIN}/engine/`,
  WINNERS = `${MAIN}/winners/`,
}

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum TypeInput {
  TEXT = 'text',
  COLOR = 'color',
}

export enum EngineStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export enum TypeTableRow {
  TH = 'th',
  TD = 'td',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TypeDataSort {
  TIME = 'time',
  WINS = 'wins',
}
