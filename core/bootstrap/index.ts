import { BillingProfileStoragePort } from "core/domain/billing-profile/outputs/biling-profile-storage-port";
import { HackathonStoragePort } from "core/domain/hackathon/outputs/hackathon-storage-port";
import { LanguageStoragePort } from "core/domain/language/outputs/language-storage-port";
import { NotificationStoragePort } from "core/domain/notification/outputs/notification-storage-port";
import { ProjectCategoryStoragePort } from "core/domain/project-category/outputs/project-category-storage-port";
import { ProjectStoragePort } from "core/domain/project/outputs/project-storage-port";
import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import { ContactAdapter } from "core/helpers/contact/contact-adapter";
import { ContactFacadePort } from "core/helpers/contact/contact-facade-port";
import { DateFacadePort } from "core/helpers/date/date-facade-port";
import { DateFnsAdapter } from "core/helpers/date/date-fns-adapter";
import { ImageAdapter } from "core/helpers/image/image-adapter";
import { ImageFacadePort } from "core/helpers/image/image-facade-port";
import { LegalAdapter } from "core/helpers/legal/legal-adapter";
import { LegalFacadePort } from "core/helpers/legal/legal-facade-port";
import { UrlAdapter } from "core/helpers/url/url-adapter";
import { UrlFacadePort } from "core/helpers/url/url-facade-port";
import { BillingProfileClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/adapters/billing-profile-client-adapter";
import { HackathonClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/adapters/hackathon-client-adapter";
import { LanguageClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/adapters/language-client-adapter";
import { NotificationClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/adapters/notification-client-adapter";
import { ProjectCategoryClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/adapters/project-category-client-adapter";
import { ProjectClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/adapters/project-client-adapter";
import { UserClientAdapter } from "core/infrastructure/marketplace-api-client-adapter/adapters/user-client-adapter";
import { AuthProvider } from "core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { FetchHttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ImpersonationProvider } from "core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";

export interface BootstrapConstructor {
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  hackathonStoragePortForClient: HackathonStoragePort;
  hackathonStoragePortForServer: HackathonStoragePort;
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  billingProfileStoragePortForClient: BillingProfileStoragePort;
  billingProfileStoragePortForServer: BillingProfileStoragePort;
  projectCategoryStoragePortForClient: ProjectCategoryStoragePort;
  projectCategoryStoragePortForServer: ProjectCategoryStoragePort;
  languageStoragePortForClient: LanguageStoragePort;
  languageStoragePortForServer: LanguageStoragePort;
  notificationStoragePortForClient: NotificationStoragePort;
  notificationStoragePortForServer: NotificationStoragePort;
  dateHelperPort: DateFacadePort;
  urlHelperPort: UrlFacadePort;
  imageHelperPort: ImageFacadePort;
  contactHelperPort: ContactFacadePort;
  legalHelperPort: LegalFacadePort;
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
  billingProfileStoragePortForClient: BillingProfileStoragePort;
  billingProfileStoragePortForServer: BillingProfileStoragePort;
  projectCategoryStoragePortForClient: ProjectCategoryStoragePort;
  projectCategoryStoragePortForServer: ProjectCategoryStoragePort;
  languageStoragePortForClient: LanguageStoragePort;
  languageStoragePortForServer: LanguageStoragePort;
  notificationStoragePortForClient: NotificationStoragePort;
  notificationStoragePortForServer: NotificationStoragePort;
  dateHelperPort: DateFacadePort;
  urlHelperPort: UrlFacadePort;
  imageHelperPort: ImageFacadePort;
  contactHelperPort: ContactFacadePort;
  legalHelperPort: LegalFacadePort;

  constructor(constructor: BootstrapConstructor) {
    this.projectStoragePortForClient = constructor.projectStoragePortForClient;
    this.projectStoragePortForServer = constructor.projectStoragePortForServer;
    this.hackathonStoragePortForClient = constructor.hackathonStoragePortForClient;
    this.hackathonStoragePortForServer = constructor.hackathonStoragePortForServer;
    this.userStoragePortForClient = constructor.userStoragePortForClient;
    this.userStoragePortForServer = constructor.userStoragePortForServer;
    this.billingProfileStoragePortForClient = constructor.billingProfileStoragePortForClient;
    this.billingProfileStoragePortForServer = constructor.billingProfileStoragePortForServer;
    this.projectCategoryStoragePortForClient = constructor.projectCategoryStoragePortForClient;
    this.projectCategoryStoragePortForServer = constructor.projectCategoryStoragePortForServer;
    this.languageStoragePortForClient = constructor.languageStoragePortForClient;
    this.languageStoragePortForServer = constructor.languageStoragePortForServer;
    this.notificationStoragePortForClient = constructor.notificationStoragePortForClient;
    this.notificationStoragePortForServer = constructor.notificationStoragePortForServer;
    this.dateHelperPort = constructor.dateHelperPort;
    this.urlHelperPort = constructor.urlHelperPort;
    this.imageHelperPort = constructor.imageHelperPort;
    this.contactHelperPort = constructor.contactHelperPort;
    this.legalHelperPort = constructor.legalHelperPort;
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

  getProjectStoragePortForServer() {
    return this.projectStoragePortForServer;
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

  getProjectCategoryStoragePortForServer() {
    return this.projectCategoryStoragePortForServer;
  }

  getProjectCategoryStoragePortForClient() {
    return this.projectCategoryStoragePortForClient;
  }

  getLanguagesStoragePortForServer() {
    return this.languageStoragePortForServer;
  }

  getLanguagesStoragePortForClient() {
    return this.languageStoragePortForClient;
  }

  getNotificationStoragePortForServer() {
    return this.notificationStoragePortForServer;
  }

  getNotificationStoragePortForClient() {
    return this.notificationStoragePortForClient;
  }

  getUserStoragePortForServer() {
    return this.userStoragePortForServer;
  }

  getBillingProfileStoragePortForClient() {
    return this.billingProfileStoragePortForClient;
  }

  getBillingProfileStoragePortForServer() {
    return this.billingProfileStoragePortForServer;
  }

  getDateHelperPort() {
    return this.dateHelperPort;
  }

  getUrlHelperPort() {
    return this.urlHelperPort;
  }

  getImageHelperPort() {
    return this.imageHelperPort;
  }

  getContactHelperPort() {
    return this.contactHelperPort;
  }

  getLegalHelperPort() {
    return this.legalHelperPort;
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
        billingProfileStoragePortForClient: new BillingProfileClientAdapter(new FetchHttpClient()),
        billingProfileStoragePortForServer: new BillingProfileClientAdapter(new FetchHttpClient()),
        projectCategoryStoragePortForClient: new ProjectCategoryClientAdapter(new FetchHttpClient()),
        projectCategoryStoragePortForServer: new ProjectCategoryClientAdapter(new FetchHttpClient()),
        languageStoragePortForClient: new LanguageClientAdapter(new FetchHttpClient()),
        languageStoragePortForServer: new LanguageClientAdapter(new FetchHttpClient()),
        // notificationStoragePortForClient: new NotificationClientAdapterMock(),
        // notificationStoragePortForServer: new NotificationClientAdapterMock(),
        notificationStoragePortForClient: new NotificationClientAdapter(new FetchHttpClient()),
        notificationStoragePortForServer: new NotificationClientAdapter(new FetchHttpClient()),
        dateHelperPort: DateFnsAdapter,
        urlHelperPort: UrlAdapter,
        imageHelperPort: new ImageAdapter(),
        contactHelperPort: new ContactAdapter(),
        legalHelperPort: new LegalAdapter(),
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
