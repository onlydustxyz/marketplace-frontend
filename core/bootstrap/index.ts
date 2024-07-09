import { ProjectStoragePort } from "core/domain/ports/output/project-storage.port";
import { FetchHttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client";
import { ProjectClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/project-client.adapter";

export type Bootstrap = {
  getProjectStoragePortForClient(): ProjectStoragePort;
  getProjectStoragePortForServer(): ProjectStoragePort;
};

export const bootstrap: Bootstrap = {
  getProjectStoragePortForClient: () => {
    return new ProjectClientAdapter(new FetchHttpClient());
  },
  getProjectStoragePortForServer: () => {
    return new ProjectClientAdapter(new FetchHttpClient());
  },
};
