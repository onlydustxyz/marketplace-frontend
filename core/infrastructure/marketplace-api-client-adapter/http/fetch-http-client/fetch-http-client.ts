// interface FetchHttpClientInterface extends HttpClient {}
interface FetchHttpClientInterface {}

// export class FetchHttpClient extends HttpClient implements FetchHttpClientInterface {
export class FetchHttpClient implements FetchHttpClientInterface {
  constructor() {
    // super();
  }

  // async request<R>({
  //   path,
  //   method,
  //   tag,
  //   pathParams,
  //   queryParams,
  //   version,
  //   body,
  //   next: nextParams = {},
  // }: FirstParameter<FetchHttpClientInterface["request"]>): Promise<R> {
  //   const url = this.buildUrl({ path, pathParams, queryParams, version });
  //   const headers = await this.getHeaders();
  //   const tags = tag ? [tag] : undefined;
  //   const next = { ...nextParams, tags };
  //   const cache = !nextParams?.revalidate ? "no-cache" : undefined;
  //
  //   const response = await fetch(url, {
  //     method,
  //     headers,
  //     body,
  //     next,
  //     cache,
  //   });
  //
  //   return this.formatResponse<R>(response);
  // }
}
