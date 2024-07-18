import { HackathonStoragePort } from "core/domain/hackathon/outputs/hackathon-storage-port";
import { ProjectStoragePort } from "core/domain/project/outputs/project-storage-port";
import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import { DateFacadePort } from "core/helpers/date/date-facade-port";
import { DateFnsAdapter } from "core/helpers/date/date-fns-adapter";
import { AuthProvider } from "core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { HackathonClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/hackathon-client-adapter";
import { FetchHttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ImpersonationProvider } from "core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { ProjectClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/project-client-adapter";
import { UserClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/user-client-adapter";

interface BootstrapConstructor {
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  hackathonStoragePortForClient: HackathonStoragePort;
  hackathonStoragePortForServer: HackathonStoragePort;
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  dateHelperPort: DateFacadePort;
}

export class Bootstrap {
  static #instance: Bootstrap;
  private authProvider?: AuthProvider;
  private impersonationProvider?: ImpersonationProvider | null = null;
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  hackathonStoragePortForClient: HackathonStoragePort;
  hackathonStoragePortForServer: HackathonStoragePort;
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  dateHelperPort: DateFacadePort;

  constructor(constructor: BootstrapConstructor) {
    this.projectStoragePortForClient = constructor.projectStoragePortForClient;
    this.projectStoragePortForServer = constructor.projectStoragePortForServer;
    this.hackathonStoragePortForClient = constructor.hackathonStoragePortForClient;
    this.hackathonStoragePortForServer = constructor.hackathonStoragePortForServer;
    this.userStoragePortForClient = constructor.userStoragePortForClient;
    this.userStoragePortForServer = constructor.userStoragePortForServer;
    this.dateHelperPort = constructor.dateHelperPort;
  }

  getAuthProvider() {
    return this.authProvider;
  }

  setAuthProvider(authProvider: AuthProvider) {
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

  getUserStoragePortForClient() {
    return this.userStoragePortForClient;
  }

  getUserStoragePortForServer() {
    return this.userStoragePortForServer;
  }

  getDateHelperPort() {
    return this.dateHelperPort;
  }

  public static get getBootstrap(): Bootstrap {
    if (!Bootstrap.#instance) {
      this.newBootstrap({
        projectStoragePortForClient: new ProjectClientAdapter(new FetchHttpClient()),
        projectStoragePortForServer: new ProjectClientAdapter(new FetchHttpClient()),
        hackathonStoragePortForClient: new HackathonClientAdapter(new FetchHttpClient()),
        hackathonStoragePortForServer: new HackathonClientAdapter(new FetchHttpClient()),
        userStoragePortForClient: new UserClientAdapter(new FetchHttpClient()),
        userStoragePortForServer: new UserClientAdapter(new FetchHttpClient()),
        dateHelperPort: DateFnsAdapter,
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
