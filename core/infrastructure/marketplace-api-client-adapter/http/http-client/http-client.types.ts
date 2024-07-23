import { HTTP_METHOD } from "next/dist/server/web/http";

type HttpClientMethod = HTTP_METHOD;
type HttpClientPathParams = Record<string, string | number>;
type HttpClientQueryParams = Record<string, string | number | string[] | number[] | boolean>;
type HttpClientBody = BodyInit;

enum HttpClientErrorStatus {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
}

interface HttpClientParameters<T extends { PathParams?: HttpClientPathParams; QueryParams?: HttpClientQueryParams }> {
  pathParams?: T["PathParams"];
  queryParams?: T["QueryParams"];
}

interface HttpStorageResponse<Response = never, Body extends object = object> {
  request(body?: Body): Promise<Response>;
  tag: string[];
}

interface HttpClientError extends Error {
  status: number;
  message: string;
  errorType: HttpClientErrorStatus;
}

export type {
  HttpClientMethod,
  HttpClientPathParams,
  HttpClientQueryParams,
  HttpClientBody,
  HttpClientParameters,
  HttpStorageResponse,
  HttpClientError,
};

export { HttpClientErrorStatus };
