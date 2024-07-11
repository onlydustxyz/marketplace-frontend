import { ProjectStoragePort } from "core/domain/project/outputs/project-storage.port";
import { AuthProvider } from "core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { FetchHttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ProjectClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/project-client.adapter";

interface BootstrapConstructor {
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
}

export class Bootstrap {
  static #instance: Bootstrap;
  private authProvider?: AuthProvider | null = null;
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;

  constructor({ projectStoragePortForClient, projectStoragePortForServer }: BootstrapConstructor) {
    this.projectStoragePortForClient = projectStoragePortForClient;
    this.projectStoragePortForServer = projectStoragePortForServer;
  }

  getProjectStoragePortForClient() {
    return this.projectStoragePortForClient;
  }

  getAuthProvider() {
    return this.authProvider;
  }

  setAuthProvider(authProvider: AuthProvider | null) {
    this.authProvider = authProvider;
  }

  public static get getBootstrap(): Bootstrap {
    if (!Bootstrap.#instance) {
      this.newBootstrap({
        projectStoragePortForClient: new ProjectClientAdapter(new FetchHttpClient()),
        projectStoragePortForServer: new ProjectClientAdapter(new FetchHttpClient()),
      });
    }

    return Bootstrap.#instance;
  }

  public static newBootstrap(constructor: BootstrapConstructor): Bootstrap {
    Bootstrap.#instance = new Bootstrap(constructor);
    return Bootstrap.#instance;
  }
}

export const bootstrap = Bootstrap.getBootstrap;
