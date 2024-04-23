import { AuthAdapter } from "api-client/adapter/auth/auth-adapter.types";
import { apiClientConfig } from "api-client/config";
import { apiVersions } from "api-client/config/api-versions";
import { HTTP_METHOD } from "next/dist/server/web/http";

import { FetchError } from "src/api/query.type";

import {
  Body,
  FetchParams,
  HttpStatusStrings,
  IFetchAdapater,
  Params,
  PathParams,
  impersonationHeaders,
} from "./fetch-adapter.types";

export class FetchAdapter implements IFetchAdapater {
  private version: apiVersions;
  private impersonationHeaders?: impersonationHeaders;
  private authAdapter?: AuthAdapter;
  private url: string = "";
  private methods: HTTP_METHOD = "GET";
  private body?: Body = undefined;
  private params?: Params = undefined;

  public tags: string[] = [];
  public pathParams: PathParams = {};
  constructor() {
    this.version = apiVersions.v1;
  }

  private getEndpointUrl(url: string, params?: { [key: string]: string }) {
    const searchParams = new URLSearchParams(params).toString();
    const pathParams = url.split("/").filter(param => param.startsWith(":"));
    pathParams.forEach(param => {
      const key = param.replace(":", "");
      url = url.replace(param, `${this.pathParams[key]}`);
    });

    const path = apiClientConfig.basePaths[this.version](url);

    return `${path}${searchParams ? `?${searchParams}` : ""}`;
  }

  private async getHeaders() {
    const accessToken = await this.authAdapter?.getAccessToken();
    return {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      "Content-Type": "application/json",
      accept: "application/json",
      ...(this.impersonationHeaders || {}),
    };
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
    const error = new Error(res.statusText) as FetchError;
    error.status = res.status;
    error.message = res.statusText;
    error.errorType = mapHttpStatusToString(res.status);
    return error;
  }

  private formatResponse<T>(res: Response, onSuccess?: () => void): T {
    if (res.ok) {
      if (res.headers.get("Content-Type") === "application/pdf") {
        onSuccess?.();
        return res.blob() as T;
      }

      onSuccess?.();
      return res.json() as T;
    }

    throw this.createFetchError(res, this.mapHttpStatusToString);
  }

  private async fetch(params?: Partial<FetchParams>) {
    const endpointUrl = this.getEndpointUrl(this.url, this.params);
    const headers = await this.getHeaders();

    return fetch(endpointUrl, {
      ...params,
      method: params?.method || this.methods,
      headers,
      body: params?.body || this.body,
      next: {
        tags: this.tags,
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
  public setMethod(methods: HTTP_METHOD) {
    this.methods = methods;
    return this;
  }
  public setBody(body: Body) {
    this.body = body;
    return this;
  }
  public setParams(params: Params) {
    this.params = params;
    return this;
  }

  public setPathParams(pathParams: PathParams) {
    this.pathParams = pathParams;
    return this;
  }

  public setTags(tags: string[]) {
    this.tags = tags;
    return this;
  }
  public setImpersonationHeaders(impersonationHeaders: impersonationHeaders) {
    this.impersonationHeaders = impersonationHeaders;
    return this;
  }

  public async request<T>(params?: Partial<FetchParams>): Promise<T> {
    const res = await this.fetch(params);

    return this.formatResponse<T>(res);
  }
}
