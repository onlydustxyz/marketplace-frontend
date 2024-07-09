import {
  HttpClient,
  PathParams,
  QueryParams,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client";

type Constructor = Pick<HttpClient, "url" | "method" | "pathParams" | "queryParams">;

interface AuthenticationProvider {
  getAccessToken(): string;
}

class Auth0AuthenticationProvider implements AuthenticationProvider {
  getAccessToken() {
    return "test";
  }
}

class Auth0AuthenticationDecoratorProvider implements AuthenticationProvider {
  constructor(private readonly authProvider: AuthenticationProvider) {}

  getAccessToken() {
    return this.authProvider.getAccessToken();
  }
}

export class FetchHttpClient implements HttpClient {
  url: string = "";
  method: string = "GET";
  pathParams: PathParams = {};
  queryParams: QueryParams = {};

  constructor(authProvider: AuthenticationProvider, props?: Constructor) {
    this.url = props?.url ?? this.url;
    this.method = props?.method ?? this.method;
    this.pathParams = props?.pathParams ?? this.pathParams;
    this.queryParams = props?.queryParams ?? this.queryParams;
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  setMethod(method: string) {
    this.method = method;
    return this;
  }

  setPathParams(pathParams: PathParams) {
    this.pathParams = pathParams;
    return this;
  }

  setQueryParams(queryParams: QueryParams) {
    this.queryParams = queryParams;
    return this;
  }

  async send<R>(): Promise<R> {
    const res = await fetch(this.url, {
      method: this.method,
    });

    return res.json();
  }
}

new FetchHttpClient(new Auth0AuthenticationProvider(), {});
new FetchHttpClient(new Auth0AuthenticationDecoratorProvider(new Auth0AuthenticationProvider()), {});
