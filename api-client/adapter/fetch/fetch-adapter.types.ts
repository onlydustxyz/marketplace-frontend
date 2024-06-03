import { AuthAdapter } from "api-client/adapter/auth/auth-adapter.types";
import { apiVersions } from "api-client/config/api-versions";
import { HTTP_METHOD } from "next/dist/server/web/http";

export type impersonationHeaders = Record<string, string> | undefined;

export interface IFetchAdapater<T> {
  request(params?: Partial<FetchParams>): Promise<T>;
  setAuthAdapter(authAdapter: AuthAdapter): IFetchAdapater<T>;
  setVersion(version: apiVersions): IFetchAdapater<T>;
  setImpersonationHeaders(header: impersonationHeaders): IFetchAdapater<T>;
  setTag(tag: string): IFetchAdapater<T>;
  setUrl(url: string): IFetchAdapater<T>;
  setMethod(method: HTTP_METHOD): IFetchAdapater<T>;
  setBody(body: Body): IFetchAdapater<T>;
  setSuccessCallback(callback: () => void): IFetchAdapater<T>;
  setErrorCallback(callback: () => void): IFetchAdapater<T>;
  setParams(params: Params): IFetchAdapater<T>;
  setPathParams(params: PathParams): IFetchAdapater<T>;
  setDebugger(enabled: boolean): IFetchAdapater<T>;
  tag?: string;
  pathParams: PathParams;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebugMessage = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Body = any;
export type Params = { [key: string]: string | number | string[] | number[] | boolean };
export type PathParams = { [key: string]: string | number };

export interface FetchParams extends Partial<RequestInit> {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Body;
  params?: Params;
  method?: HTTP_METHOD;
}
export interface FetchAdapaterConstructor {
  url: string;
  method: HTTP_METHOD;
  pathParams?: PathParams;
  params?: Params;
  tag?: string;
  version?: apiVersions;
}

export enum HttpStatusStrings {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
}
