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
