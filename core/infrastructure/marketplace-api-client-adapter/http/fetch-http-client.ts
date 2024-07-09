import { AuthProvider } from "core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { marketplaceApiConfig } from "core/infrastructure/marketplace-api-client-adapter/config";
import { MarketplaceApiVersion } from "core/infrastructure/marketplace-api-client-adapter/config/api-version";
import {
  HttpClient,
  HttpClientBody,
  HttpClientMethod,
  HttpClientPathParams,
  HttpClientQueryParams,
  HttpImpersonationHeaders,
  HttpStatusString,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

interface IFetchHttpClient extends HttpClient {
  setDebug(enabled: boolean): this;
}

type Constructor = Pick<
  IFetchHttpClient,
  "url" | "method" | "pathParams" | "queryParams" | "version" | "tag" | "body" | "impersonationHeaders"
>;

interface FetchError extends Error {
  status: number;
  message: string;
  errorType: HttpStatusString;
}

export class FetchHttpClient implements IFetchHttpClient {
  url: string = "";
  method: HttpClientMethod = "GET";
  pathParams: HttpClientPathParams = {};
  queryParams: HttpClientQueryParams = {};
  version: MarketplaceApiVersion = MarketplaceApiVersion.v1;
  tag: string = "";
  body?: HttpClientBody;
  impersonationHeaders: HttpImpersonationHeaders = {};
  private debug: boolean = false;
  private authProvider: AuthProvider;

  constructor(authProvider: AuthProvider, props?: Constructor) {
    this.authProvider = authProvider;
    this.url = props?.url ?? this.url;
    this.method = props?.method ?? this.method;
    this.pathParams = props?.pathParams ?? this.pathParams;
    this.queryParams = props?.queryParams ?? this.queryParams;
    this.version = props?.version ?? this.version;
    this.tag = props?.tag ?? this.tag;
    this.body = props?.body;
    this.impersonationHeaders = props?.impersonationHeaders ?? this.impersonationHeaders;
    this.debug = false;
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  setMethod(method: HttpClientMethod) {
    this.method = method;
    return this;
  }

  setPathParams(pathParams: HttpClientPathParams) {
    this.pathParams = pathParams;
    return this;
  }

  setQueryParams(queryParams: HttpClientQueryParams) {
    this.queryParams = queryParams;
    return this;
  }

  setVersion(version: MarketplaceApiVersion) {
    this.version = version;
    return this;
  }

  setTag(tag: string) {
    this.tag = tag;
    return this;
  }

  setBody(body: HttpClientBody) {
    this.body = body;
    return this;
  }

  public setImpersonationHeaders(impersonationHeaders: HttpImpersonationHeaders) {
    this.impersonationHeaders = impersonationHeaders;
    return this;
  }

  setDebug(enabled: boolean) {
    this.debug = enabled;
    return this;
  }

  private logDebug(...messages: unknown[]) {
    if (this.debug) {
      console.log(...messages);
    }
  }

  private async getHeaders() {
    const defaultHeaders = {
      "Content-Type": "application/json",
      accept: "application/json",
      ...this.impersonationHeaders,
    };

    try {
      const accessToken = await this.authProvider?.getAccessToken();
      return {
        ...defaultHeaders,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      };
    } catch {
      return defaultHeaders;
    }
  }

  private buildSearchParams(queryParams: HttpClientQueryParams = {}) {
    return Object.entries(queryParams)
      .reduce((acc, [key, value]) => {
        if (value === undefined) {
          return acc;
        }

        if (Array.isArray(value)) {
          acc.append(key, value.join(","));
        } else {
          acc.append(key, String(value));
        }

        return acc;
      }, new URLSearchParams())
      .toString();
  }

  private buildUrl(path: string, queryParams?: HttpClientQueryParams) {
    const searchParams = this.buildSearchParams(queryParams);

    const pathParams = path.split("/").filter(segment => segment.startsWith(":"));
    pathParams.forEach(pathParam => {
      const key = pathParam.replace(":", "");
      path = path.replace(pathParam, String(this.pathParams[key]));
    });

    return `${marketplaceApiConfig.basePaths[this.version](path)}${searchParams ? `?${searchParams}` : ""}`;
  }

  private mapHttpStatusToString(statusCode: number): HttpStatusString {
    const statusMap: { [key: number]: HttpStatusString } = {
      400: HttpStatusString.BAD_REQUEST,
      401: HttpStatusString.UNAUTHORIZED,
      403: HttpStatusString.FORBIDDEN,
      404: HttpStatusString.NOT_FOUND,
      409: HttpStatusString.CONFLICT,
      500: HttpStatusString.INTERNAL_SERVER_ERROR,
      501: HttpStatusString.NOT_IMPLEMENTED,
    };

    return statusMap[statusCode] || HttpStatusString.UNHANDLED_ERROR;
  }

  private createFetchError(res: Response, mapHttpStatusToString: (statusCode: number) => HttpStatusString): FetchError {
    const error: FetchError = {
      name: "Fetch Error",
      status: res.status,
      message: res.statusText,
      errorType: mapHttpStatusToString(res.status),
    };

    this.logDebug(" Error");
    this.logDebug(`   --- With status : ${error.status}`);
    this.logDebug(`   --- With message : ${error.message}`);
    this.logDebug(`   --- With type : ${error.errorType}`);

    return error;
  }

  private async formatResponse<R>(res: Response): Promise<R> {
    if (res.ok) {
      if (res.headers.get("Content-Type") === "application/pdf") {
        const blob = await res.blob();
        this.logDebug(" Success");
        this.logDebug("   --- with response", blob);
        return blob as R;
      }

      try {
        const json = await res.json();
        this.logDebug(" Success");
        this.logDebug("   --- with response", json);
        return json as R;
      } catch {
        this.logDebug(" Unknown content type");
        return {} as R;
      }
    }

    throw this.createFetchError(res, this.mapHttpStatusToString);
  }

  async send<R>(params?: { next?: NextFetchRequestConfig }): Promise<R> {
    const url = this.buildUrl(this.url, this.queryParams);
    const method = this.method;
    const headers = await this.getHeaders();
    const body = this.body;
    const tags = this.tag ? [this.tag] : undefined;
    const next = { ...params?.next, tags };
    const cache = !params?.next?.revalidate ? "no-cache" : undefined;

    this.logDebug(`fetching ${url}`);
    this.logDebug(" --- with method :", method);
    this.logDebug(" --- with query params :", this.queryParams);
    this.logDebug(" --- with body :", body);
    this.logDebug(" --- with tags :", tags);

    const response = await fetch(url, {
      method,
      headers,
      body,
      next,
      cache,
    });

    return this.formatResponse<R>(response);
  }
}
