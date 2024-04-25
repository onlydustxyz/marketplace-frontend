import { apiVersions } from "api-client/config/api-versions";
import { API_CLIENT_BASE_URL } from "api-client/config/base-url";

export const ApiClientBasePaths = {
  [apiVersions.v1]: (path: string) => `${API_CLIENT_BASE_URL}/api/v1/${path}`,
  [apiVersions.v2]: (path: string) => `${API_CLIENT_BASE_URL}/api/v2/${path}`,
};
