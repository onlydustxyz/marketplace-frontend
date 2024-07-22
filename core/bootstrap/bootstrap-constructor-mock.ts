import { BootstrapConstructor } from "core/bootstrap/index";
import { DateAdapterMock } from "core/helpers/date/date-adapter-mock";
import { UrlAdapterMock } from "core/helpers/url/url-adapter-mock";
import { HackathonClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/hackathon-client-adapter-mock";
import { ProjectClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-client-adapter-mock";
import { UserClientAdapterMock } from "core/infrastructure/marketplace-api-client-adapter/mock-adapters/user-client-adapter-mock";

export const bootstrapConstructorMock: BootstrapConstructor = {
  projectStoragePortForClient: new ProjectClientAdapterMock(),
  projectStoragePortForServer: new ProjectClientAdapterMock(),
  hackathonStoragePortForClient: new HackathonClientAdapterMock(),
  hackathonStoragePortForServer: new HackathonClientAdapterMock(),
  userStoragePortForClient: new UserClientAdapterMock(),
  userStoragePortForServer: new UserClientAdapterMock(),
  dateHelperPort: DateAdapterMock,
  urlHelperPort: UrlAdapterMock,
};
