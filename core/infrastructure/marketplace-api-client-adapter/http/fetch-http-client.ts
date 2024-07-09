import { marketplaceApiConfig } from "core/infrastructure/marketplace-api-client-adapter/config";
import { MarketplaceApiVersion } from "core/infrastructure/marketplace-api-client-adapter/config/api-version";
import {
  HttpClient,
  HttpClientBody,
  HttpClientMethod,
  HttpClientPathParams,
  HttpClientQueryParams,
  HttpStatusString,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

interface IFetchHttpClient extends HttpClient {
  setDebug(enabled: boolean): this;
}

interface FetchError extends Error {
  status: number;
  message: string;
  errorType: HttpStatusString;
}

type Constructor = Pick<IFetchHttpClient, "url" | "method" | "pathParams" | "queryParams" | "version" | "tag" | "body">;

// interface AuthenticationProvider {
//   getAccessToken(): string;
// }
//
// class Auth0AuthenticationProvider implements AuthenticationProvider {
//   getAccessToken() {
//     return "test";
//   }
// }
//
// class Auth0AuthenticationDecoratorProvider implements AuthenticationProvider {
//   constructor(private readonly authProvider: AuthenticationProvider) {}
//
//   getAccessToken() {
//     return this.authProvider.getAccessToken();
//   }
// }

export class FetchHttpClient implements IFetchHttpClient {
  url: string = "";
  method: HttpClientMethod = "GET";
  pathParams: HttpClientPathParams = {};
  queryParams: HttpClientQueryParams = {};
  version: MarketplaceApiVersion = MarketplaceApiVersion.v1;
  tag: string = "";
  body?: HttpClientBody;
  private debug: boolean = false;

  constructor(props?: Constructor) {
    this.url = props?.url ?? this.url;
    this.method = props?.method ?? this.method;
    this.pathParams = props?.pathParams ?? this.pathParams;
    this.queryParams = props?.queryParams ?? this.queryParams;
    this.version = props?.version ?? this.version;
    this.tag = props?.tag ?? this.tag;
    this.body = props?.body;
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

  setDebug(enabled: boolean) {
    this.debug = enabled;
    return this;
  }

  private debugLog(...messages: unknown[]) {
    if (this.debug) {
      console.log(...messages);
    }
  }

  private async getHeaders() {
    const defaultHeaders = {
      "Content-Type": "application/json",
      accept: "application/json",
      // ...(this.impersonationHeaders || {}),
    };

    try {
      // const accessToken = await this.authAdapter?.getAccessToken();
      return {
        ...defaultHeaders,
        // ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
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

    this.debugLog(" Error");
    this.debugLog(`   --- With status : ${error.status}`);
    this.debugLog(`   --- With message : ${error.message}`);
    this.debugLog(`   --- With type : ${error.errorType}`);

    return error;
  }

  private async formatResponse<R>(res: Response): Promise<R> {
    if (res.ok) {
      if (res.headers.get("Content-Type") === "application/pdf") {
        const blob = await res.blob();
        this.debugLog(" Success");
        this.debugLog("   --- with response", blob);
        return blob as R;
      }

      try {
        const json = await res.json();
        this.debugLog(" Success");
        this.debugLog("   --- with response", json);
        return json as R;
      } catch {
        this.debugLog(" Unknown content type");
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

    this.debugLog(`fetching ${url}`);
    this.debugLog(" --- with method :", method);
    this.debugLog(" --- with query params :", this.queryParams);
    this.debugLog(" --- with body :", body);
    this.debugLog(" --- with tags :", tags);

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
