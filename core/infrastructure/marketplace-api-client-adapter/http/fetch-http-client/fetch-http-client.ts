import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

interface IFetchHttpClient extends HttpClient {}

export class FetchHttpClient extends HttpClient implements IFetchHttpClient {
  constructor() {
    super();
  }

  async request<R>({
    path,
    method,
    tag,
    pathParams,
    queryParams,
    version,
    body,
    impersonationHeaders,
    next: nextParams = {},
  }: FirstParameter<IFetchHttpClient["request"]>): Promise<R> {
    const url = this.buildUrl({ path, pathParams, queryParams, version });
    const headers = await this.getHeaders({ impersonationHeaders });
    const tags = tag ? [tag] : undefined;
    const next = { ...nextParams, tags };
    const cache = !nextParams?.revalidate ? "no-cache" : undefined;

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
