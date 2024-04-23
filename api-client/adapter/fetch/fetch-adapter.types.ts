import { AuthAdapter } from "api-client/adapter/auth/auth-adapter.types";
import { apiVersions } from "api-client/config/api-versions";
import { HTTP_METHOD } from "next/dist/server/web/http";

export type impersonationHeaders = Record<string, string> | undefined;

export interface IFetchAdapater {
  fetch(params: FetchParams): Promise<Response>;
  get<T>(params?: Partial<FetchParams>): Promise<T>;
  post<T>(params?: Partial<FetchParams>): Promise<T>;
  put<T>(params?: Partial<FetchParams>): Promise<T>;
  delete<T>(params?: Partial<FetchParams>): Promise<T>;
  setAuthAdapter(authAdapter: AuthAdapter): void;
}

export type defaultParamsType = string | number | boolean | undefined | string[] | number[];
export type defaultParams = Record<string, defaultParamsType>;

export interface FetchParams extends Partial<RequestInit> {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  params?: defaultParams;
  method?: HTTP_METHOD;
}
export interface FetchAdapaterParams {
  fetchFn: FetchParams;
  version?: apiVersions;
  authAdapter?: AuthAdapter;
  impersonationHeaders?: impersonationHeaders;
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
