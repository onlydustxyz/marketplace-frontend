import { API_CLIENT_BASE_URL } from "api-client/config/base-url";

export const ApiClientBasePaths = {
  V1: (path: string) => `${API_CLIENT_BASE_URL}/api/v1/${path}`,
  V2: (path: string) => `${API_CLIENT_BASE_URL}/api/v2/${path}`,
};
