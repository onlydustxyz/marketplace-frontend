import { AuthAdapter } from "api-client/adapter/auth/auth-adapter.types";
import { apiVersions } from "api-client/config/api-versions";
import { ApiClientBasePaths } from "api-client/config/base-path";

import { FetchError } from "src/api/query.type";

import {
  FetchAdapaterParams,
  FetchParams,
  HttpStatusStrings,
  IFetchAdapater,
  impersonationHeaders,
} from "./fetch-adapter.types";

export class FetchAdapter implements IFetchAdapater {
  private readonly version: apiVersions;
  impersonationHeaders?: impersonationHeaders;
  private authAdapter?: AuthAdapter;
  private fetchFn: FetchParams;
  constructor(params: FetchAdapaterParams) {
    this.version = params.version || apiVersions.v1;
    this.impersonationHeaders = params.impersonationHeaders;
    this.authAdapter = params.authAdapter;
    this.fetchFn = params.fetchFn;
  }

  private getEndpointUrl(url: string, params: { [key: string]: string }) {
    const searchParams = new URLSearchParams(params).toString();

    const path = ApiClientBasePaths[this.version](url);

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

  private formatResponse<T>(res: Response): T {
    if (res.ok) {
      if (res.headers.get("Content-Type") === "application/pdf") {
        return res.blob() as T;
      }
      return res.json() as T;
    }

    throw this.createFetchError(res, this.mapHttpStatusToString);
  }

  public setAuthAdapter(authAdapter: AuthAdapter) {
    this.authAdapter = authAdapter;
  }

  public async fetch({ url, body, params = {}, method = "GET" }: FetchParams) {
    const endpointUrl = this.getEndpointUrl(url, params);
    const headers = await this.getHeaders();
    return fetch(endpointUrl, {
      method,
      headers,
      body,
    });
  }

  public async get<T>(params?: Partial<FetchParams>): Promise<T> {
    const res = await this.fetch({ method: "GET", ...this.fetchFn, ...(params || {}) });

    return this.formatResponse<T>(res);
  }

  public async post<T>(params?: Partial<FetchParams>): Promise<T> {
    const res = await this.fetch({ method: "POST", ...this.fetchFn, ...(params || {}) });

    return this.formatResponse<T>(res);
  }

  public async put<T>(params?: Partial<FetchParams>): Promise<T> {
    const res = await this.fetch({ method: "PUT", ...this.fetchFn, ...(params || {}) });

    return this.formatResponse<T>(res);
  }

  public async delete<T>(params?: Partial<FetchParams>): Promise<T> {
    const res = await this.fetch({ method: "DELETE", ...this.fetchFn, ...(params || {}) });

    return this.formatResponse<T>(res);
  }
}
