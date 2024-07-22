import { bootstrap } from "core/bootstrap";
import { marketplaceApiConfig } from "core/infrastructure/marketplace-api-client-adapter/config";
import { MarketplaceApiVersion } from "core/infrastructure/marketplace-api-client-adapter/config/api-version";
import {
  HttpClientBody,
  HttpClientError,
  HttpClientErrorStatus,
  HttpClientMethod,
  HttpClientPathParams,
  HttpClientQueryParams,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export class HttpClient {
  request<R>(args: {
    path: string;
    method: HttpClientMethod;
    tag: string[];
    pathParams?: HttpClientPathParams;
    queryParams?: HttpClientQueryParams;
    version?: MarketplaceApiVersion;
    body?: HttpClientBody;
    next?: NextFetchRequestConfig;
  }): Promise<R>;

  request<R>(): Promise<R> {
    return Promise.resolve({} as R);
  }

  async getHeaders() {
    const impersonationProvider = bootstrap.getImpersonationProvider();
    const impersonationHeaders = impersonationProvider?.getImpersonationHeaders() ?? {};

    const defaultHeaders = {
      "Content-Type": "application/json",
      accept: "application/json",
      ...impersonationHeaders,
    };

    try {
      const authProvider = bootstrap.getAuthProvider();
      const accessToken = await authProvider?.getAccessToken();
      const authHeaders = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      return {
        ...defaultHeaders,
        ...authHeaders,
      };
    } catch {
      return defaultHeaders;
    }
  }

  protected buildSearchParams(queryParams: HttpClientQueryParams = {}) {
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

  buildUrl({
    path,
    pathParams,
    queryParams,
    version = MarketplaceApiVersion.v1,
  }: {
    path: string;
    pathParams?: HttpClientPathParams;
    queryParams?: HttpClientQueryParams;
    version?: MarketplaceApiVersion;
  }) {
    const searchParams = this.buildSearchParams(queryParams);

    if (pathParams) {
      const pathParamSegments = path.split("/").filter(segment => segment.startsWith(":"));
      pathParamSegments.forEach(pathParamSegment => {
        const key = pathParamSegment.replace(":", "");
        path = path.replace(pathParamSegment, String(pathParams[key]));
      });
    }

    return `${marketplaceApiConfig.basePaths[version](path)}${searchParams ? `?${searchParams}` : ""}`;
  }

  static buildTagParameter(obj: HttpClientPathParams | HttpClientQueryParams) {
    return Object.keys(obj)
      .sort()
      .reduce((acc, key, i, arr) => {
        acc += key + ":" + obj[key];

        if (arr.length != i + 1) {
          acc += "-";
        }

        return acc;
      }, "");
  }

  static buildTag({
    path,
    pathParams,
    queryParams,
  }: {
    path: string;
    pathParams?: HttpClientPathParams;
    queryParams?: HttpClientQueryParams;
  }) {
    const tagList = [path];

    if (pathParams) {
      tagList.push(HttpClient.buildTagParameter(pathParams));
    }

    if (queryParams) {
      tagList.push(HttpClient.buildTagParameter(queryParams));
    }

    return tagList;
  }

  protected mapHttpStatusToString(statusCode: number): HttpClientErrorStatus {
    const statusMap: { [key: number]: HttpClientErrorStatus } = {
      400: HttpClientErrorStatus.BAD_REQUEST,
      401: HttpClientErrorStatus.UNAUTHORIZED,
      403: HttpClientErrorStatus.FORBIDDEN,
      404: HttpClientErrorStatus.NOT_FOUND,
      409: HttpClientErrorStatus.CONFLICT,
      500: HttpClientErrorStatus.INTERNAL_SERVER_ERROR,
      501: HttpClientErrorStatus.NOT_IMPLEMENTED,
    };

    return statusMap[statusCode] || HttpClientErrorStatus.UNHANDLED_ERROR;
  }

  protected buildHttpError(res: Response): HttpClientError {
    return {
      name: "Fetch Error",
      status: res.status,
      message: res.statusText,
      errorType: this.mapHttpStatusToString(res.status),
    };
  }

  async formatResponse<R>(res: Response): Promise<R> {
    if (res.ok) {
      if (res.headers.get("Content-Type") === "application/pdf") {
        return (await res.blob()) as R;
      }

      try {
        return (await res.json()) as R;
      } catch {
        return {} as R;
      }
    }

    throw this.buildHttpError(res);
  }
}
