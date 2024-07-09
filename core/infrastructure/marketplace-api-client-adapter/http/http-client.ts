import { HTTP_METHOD } from "next/dist/server/web/http";

export type PathParams = Record<string, string | number>;
export type QueryParams = Record<string, string | number | string[] | number[] | boolean>;

export interface HttpClient {
  url: string;
  method: string;
  pathParams: PathParams;
  queryParams: QueryParams;
  setUrl(url: string): HttpClient;
  setMethod(method: HTTP_METHOD): HttpClient;
  setPathParams(pathParams: PathParams): HttpClient;
  setQueryParams(queryParams: QueryParams): HttpClient;
  send<R>(): Promise<R>;
}
