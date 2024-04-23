import { AuthAdapter } from "api-client/adapter/auth/auth-adapter.types";
import { apiVersions } from "api-client/config/api-versions";
import { HTTP_METHOD } from "next/dist/server/web/http";

export type impersonationHeaders = Record<string, string> | undefined;

export interface IFetchAdapater {
  request<T>(params?: Partial<FetchParams>): Promise<T>;
  setAuthAdapter(authAdapter: AuthAdapter): void;
  setVersion(version: apiVersions): void;
  setImpersonationHeaders(header: impersonationHeaders): void;
  setTags(tags: string[]): void;
  setUrl(url: string): void;
  setMethod(method: HTTP_METHOD): void;
  setBody(body: Body): void;
  setParams(params: Params): void;
  setPathParams(params: PathParams): void;
  tags: string[];
  pathParams: PathParams;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Body = any;
export type Params = { [key: string]: string };
export type PathParams = { [key: string]: string | number };

export interface FetchParams extends Partial<RequestInit> {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  params?: { [key: string]: string };
  method?: HTTP_METHOD;
  onSuccess?: () => void;
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
