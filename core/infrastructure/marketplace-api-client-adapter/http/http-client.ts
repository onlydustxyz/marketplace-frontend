import { MarketplaceApiVersion } from "core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { HTTP_METHOD } from "next/dist/server/web/http";

export type HttpClientMethod = HTTP_METHOD;
export type HttpClientPathParams = Record<string, string | number>;
export type HttpClientQueryParams = Record<string, string | number | string[] | number[] | boolean>;
export type HttpClientBody = BodyInit;

interface HttpClientPagination {
  pageIndex?: number;
  pageSize?: number;
}

export interface HttpClientParameters<
  T extends { QueryParams?: HttpClientQueryParams; PathParams?: HttpClientPathParams }
> {
  queryParams?: T["QueryParams"];
  pathParams?: T["PathParams"];
  pagination?: HttpClientPagination;
}

export interface HttpClient {
  url: string;
  method: HttpClientMethod;
  pathParams?: HttpClientPathParams;
  queryParams?: HttpClientQueryParams;
  version?: MarketplaceApiVersion;
  tag: string;
  body?: HttpClientBody;
  setUrl(url: string): this;
  setMethod(method: HttpClientMethod): this;
  setPathParams(pathParams: HttpClientPathParams): this;
  setQueryParams(queryParams: HttpClientQueryParams): this;
  setVersion(version: MarketplaceApiVersion): this;
  setTag(tag: string): this;
  setBody(body: HttpClientBody): this;
  send<R>(): Promise<R>;
}

export enum HttpStatusString {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
}
