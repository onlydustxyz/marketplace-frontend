import { LanguagesStoragePort } from "core/domain/languages/outputs/languages-storage-port";
import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class LanguagesClientAdapterMock implements LanguagesStoragePort {
  constructor() {}

  routes = {};

  getLanguages = mockHttpStorageResponse<LanguagesStoragePort["getLanguages"]>;
}
