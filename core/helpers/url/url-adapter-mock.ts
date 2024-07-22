import { UrlFacadePort } from "core/helpers/url/url-facade-port";

export const UrlAdapterMock: UrlFacadePort = {
  validateUrl: (_url: string) => "https://example.com",
};
