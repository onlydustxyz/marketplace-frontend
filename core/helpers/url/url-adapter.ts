import { UrlFacadePort } from "core/helpers/url/url-facade-port";

export const UrlAdapter: UrlFacadePort = {
  validateUrl: (url: string) => (url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`),
};
