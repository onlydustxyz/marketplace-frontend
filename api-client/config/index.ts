import { ApiClientBasePaths } from "api-client/config/base-path";
import { API_CLIENT_BASE_URL } from "api-client/config/base-url";
import { apiResources } from "api-client/config/resources";

export const apiClientConfig = {
  baseUrl: API_CLIENT_BASE_URL,
  basePaths: ApiClientBasePaths,
  resources: apiResources,
};
