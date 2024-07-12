import { HackathonStoragePort } from "core/domain/hackathon/outputs/hackathon-storage-port";
import { ProjectStoragePort } from "core/domain/project/outputs/project-storage-port";
import { AuthProvider } from "core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { HackathonClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/hackathon-client-adapter";
import { FetchHttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ImpersonationProvider } from "core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { ProjectClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/project-client-adapter";

interface BootstrapConstructor {
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  hackathonStoragePortForClient: HackathonStoragePort;
  hackathonStoragePortForServer: HackathonStoragePort;
}

export class Bootstrap {
  static #instance: Bootstrap;
  private authProvider?: AuthProvider | null = null;
  private impersonationProvider?: ImpersonationProvider | null = null;
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  hackathonStoragePortForClient: HackathonStoragePort;
  hackathonStoragePortForServer: HackathonStoragePort;

  constructor(constructor: BootstrapConstructor) {
    this.projectStoragePortForClient = constructor.projectStoragePortForClient;
    this.projectStoragePortForServer = constructor.projectStoragePortForServer;
    this.hackathonStoragePortForClient = constructor.hackathonStoragePortForClient;
    this.hackathonStoragePortForServer = constructor.hackathonStoragePortForServer;
  }

  getAuthProvider() {
    return this.authProvider;
  }

  setAuthProvider(authProvider: AuthProvider | null) {
    this.authProvider = authProvider;
  }

  getImpersonationProvider() {
    return this.impersonationProvider;
  }

  setImpersonationProvider(impersonationProvider: ImpersonationProvider | null) {
    this.impersonationProvider = impersonationProvider;
  }

  getProjectStoragePortForClient() {
    return this.projectStoragePortForClient;
  }

  getHackathonStoragePortForClient() {
    return this.hackathonStoragePortForClient;
  }

  getHackathonStoragePortForServer() {
    return this.hackathonStoragePortForServer;
  }

  public static get getBootstrap(): Bootstrap {
    if (!Bootstrap.#instance) {
      this.newBootstrap({
        projectStoragePortForClient: new ProjectClientAdapter(new FetchHttpClient()),
        projectStoragePortForServer: new ProjectClientAdapter(new FetchHttpClient()),
        hackathonStoragePortForServer: new HackathonClientAdapter(new FetchHttpClient()),
        hackathonStoragePortForClient: new HackathonClientAdapter(new FetchHttpClient()),
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
