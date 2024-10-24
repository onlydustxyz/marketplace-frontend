import { BootstrapConstructor } from "core/bootstrap/index";
import { ContactAdapterMock } from "core/helpers/contact/contact-adapter-mock";
import { DateAdapterMock } from "core/helpers/date/date-adapter-mock";
import { ImageAdapterMock } from "core/helpers/image/image-adapter-mock";
import { LegalAdapterMock } from "core/helpers/legal/legal-adapter-mock";
import { UrlAdapterMock } from "core/helpers/url/url-adapter-mock";
import { BillingProfileClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/billing-profile-client-adapter-mock";
import { HackathonClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/hackathon-client-adapter-mock";
import { LanguagesClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/languages-client-adapter-mock";
import { NotificationClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/notification-client-adapter-mock";
import { ProjectCategoryClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-category-client-adapter-mock";
import { ProjectClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-client-adapter-mock";
import { RewardClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/reward-client-adapter-mock";
import { UserClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/user-client-adapter-mock";

export const bootstrapConstructorMock: BootstrapConstructor = {
  projectStoragePortForClient: new ProjectClientAdapterMock(),
  projectStoragePortForServer: new ProjectClientAdapterMock(),
  hackathonStoragePortForClient: new HackathonClientAdapterMock(),
  hackathonStoragePortForServer: new HackathonClientAdapterMock(),
  userStoragePortForClient: new UserClientAdapterMock(),
  userStoragePortForServer: new UserClientAdapterMock(),
  billingProfileStoragePortForClient: new BillingProfileClientAdapterMock(),
  billingProfileStoragePortForServer: new BillingProfileClientAdapterMock(),
  projectCategoryStoragePortForClient: new ProjectCategoryClientAdapterMock(),
  projectCategoryStoragePortForServer: new ProjectCategoryClientAdapterMock(),
  languageStoragePortForClient: new LanguagesClientAdapterMock(),
  languageStoragePortForServer: new LanguagesClientAdapterMock(),
  notificationStoragePortForClient: new NotificationClientAdapterMock(),
  notificationStoragePortForServer: new NotificationClientAdapterMock(),
  rewardStoragePortForClient: new RewardClientAdapterMock(),
  rewardStoragePortForServer: new RewardClientAdapterMock(),
  dateHelperPort: DateAdapterMock,
  urlHelperPort: UrlAdapterMock,
  imageHelperPort: new ImageAdapterMock(),
  contactHelperPort: new ContactAdapterMock(),
  legalHelperPort: new LegalAdapterMock(),
};
