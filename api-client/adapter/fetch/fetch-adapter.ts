import { AuthAdapter } from "api-client/adapter/auth/auth-adapter.types";
import { apiClientConfig } from "api-client/config";
import { apiVersions } from "api-client/config/api-versions";
import { HTTP_METHOD } from "next/dist/server/web/http";

import { FetchError } from "src/api/query.type";

import {
  Body,
  DebugMessage,
  FetchAdapaterConstructor,
  FetchParams,
  HttpStatusStrings,
  IFetchAdapater,
  Params,
  PathParams,
  impersonationHeaders,
} from "./fetch-adapter.types";

export class FetchAdapter<T> implements IFetchAdapater<T> {
  private version: apiVersions;
  private impersonationHeaders?: impersonationHeaders;
  private authAdapter?: AuthAdapter;
  private url: string = "";
  private debug: boolean = false;
  private method: HTTP_METHOD = "GET";
  private body?: Body = undefined;
  private params?: Params = undefined;
  private successCallback?: () => void;
  private errorCallback?: () => void;

  public tag?: string;
  public pathParams: PathParams;
  constructor(params: FetchAdapaterConstructor) {
    this.url = params.url || "";
    this.method = params.method;
    this.pathParams = params.pathParams || {};
    this.params = params.params;
    this.tag = params.tag;
    this.version = params.version || apiVersions.v1;
    this.debug = false;
  }

  private debugLog(...messages: DebugMessage) {
    if (this.debug) {
      console.log(...messages);
    }
  }

  private convertParamsToURLSearchParams(params?: Params) {
    if (!params) return undefined;

    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        if (typeof value === "string" || typeof value === "number") {
          acc.append(key, value.toString());
        }
        if (typeof value === "boolean") {
          if (value) {
            acc.append(key, "true");
          } else {
            acc.append(key, "false");
          }
        }
        if (Array.isArray(value)) {
          acc.append(key, value.join(","));
        }
      }
      return acc;
    }, new URLSearchParams());
  }

  private getEndpointUrl(url: string, params?: Params) {
    const searchParams = this.convertParamsToURLSearchParams(params)?.toString();

    const pathParams = url.split("/").filter(param => param.startsWith(":"));
    pathParams.forEach(param => {
      const key = param.replace(":", "");
      url = url.replace(param, `${this.pathParams[key]}`);
    });

    const path = apiClientConfig.basePaths[this.version](url);

    return `${path}${searchParams ? `?${searchParams}` : ""}`;
  }

  private async getHeaders() {
    const defaultHeaders = {
      "Content-Type": "application/json",
      accept: "application/json",
      ...(this.impersonationHeaders || {}),
    };

    try {
      const accessToken = await this.authAdapter?.getAccessToken();
      return {
        ...defaultHeaders,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      };
    } catch {
      return defaultHeaders;
    }
  }

  private mapHttpStatusToString(statusCode: number): HttpStatusStrings {
    const statusMap: { [key: number]: HttpStatusStrings } = {
      400: HttpStatusStrings.BAD_REQUEST,
      401: HttpStatusStrings.UNAUTHORIZED,
      403: HttpStatusStrings.FORBIDDEN,
      404: HttpStatusStrings.NOT_FOUND,
      409: HttpStatusStrings.CONFLICT,
      500: HttpStatusStrings.INTERNAL_SERVER_ERROR,
      501: HttpStatusStrings.NOT_IMPLEMENTED,
    };

    return statusMap[statusCode] || HttpStatusStrings.UNHANDLED_ERROR;
  }

  private createFetchError(
    res: Response,
    mapHttpStatusToString: (statusCode: number) => HttpStatusStrings
  ): FetchError {
    const error = {} as FetchError;
    error.status = res.status;
    error.message = res.statusText;
    error.errorType = mapHttpStatusToString(res.status);
    this.debugLog(" Error");
    this.debugLog(`   --- With status : ${error.status}`);
    this.debugLog(`   --- With message : ${error.message}`);
    this.debugLog(`   --- With type : ${error.errorType}`);
    return error;
  }

  private async formatResponse(res: Response): Promise<T> {
    if (res.ok) {
      if (res.headers.get("Content-Type") === "application/pdf") {
        this.successCallback?.();
        return (await res.blob()) as T;
      }

      try {
        this.successCallback?.();
        const json = await res.json();
        this.debugLog(" Success");
        this.debugLog("   --- with response", json);
        return json as T;
      } catch {
        return {} as T;
      }
    }

    this.errorCallback?.();
    throw this.createFetchError(res, this.mapHttpStatusToString);
  }

  private async fetch(params?: Partial<FetchParams>) {
    const endpointUrl = this.getEndpointUrl(this.url, this.params);
    const headers = await this.getHeaders();
    this.debugLog(`fetching ${endpointUrl}`);
    this.debugLog(" --- with method :", params?.method || this.method);
    this.debugLog(" --- with params :", this.params);
    this.debugLog(" --- with body :", params?.body || this.body);
    this.debugLog(" --- with tag :", { ...(this.tag ? { tag: [this.tag] } : {}) });

    return fetch(endpointUrl, {
      ...(!params?.next?.revalidate ? { cache: "no-cache" } : {}),
      ...params,
      method: params?.method || this.method,
      headers,
      body: params?.body || this.body,
      next: {
        ...(this.tag ? { tag: [this.tag] } : {}),
        ...params?.next,
      },
    });
  }

  public setAuthAdapter(authAdapter: AuthAdapter) {
    this.authAdapter = authAdapter;
    return this;
  }

  public setVersion(version: apiVersions) {
    this.version = version;
    return this;
  }

  public setUrl(url: string) {
    this.url = url;
    return this;
  }
  public setMethod(method: HTTP_METHOD) {
    this.method = method;
    return this;
  }
  public setBody(body: Body) {
    this.body = body;
    return this;
  }
  public setParams(params: Params) {
    this.params = {
      ...this.params,
      ...params,
    };

    return this;
  }

  public setPathParams(pathParams: PathParams) {
    this.pathParams = pathParams;
    return this;
  }

  public setTag(tag: string) {
    this.tag = tag;
    return this;
  }

  public setSuccessCallback(callback: () => void) {
    this.successCallback = callback;
    return this;
  }

  public setErrorCallback(callback: () => void) {
    this.errorCallback = callback;
    return this;
  }
  public setImpersonationHeaders(impersonationHeaders: impersonationHeaders) {
    this.impersonationHeaders = impersonationHeaders;
    return this;
  }

  public setDebugger(enabled: boolean) {
    this.debug = enabled;
    return this;
  }

  public async request(params?: Partial<FetchParams>): Promise<T> {
    const res = await this.fetch(params);

    return this.formatResponse(res);
  }
}
