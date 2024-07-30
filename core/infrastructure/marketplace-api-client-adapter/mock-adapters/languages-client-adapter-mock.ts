import { LanguageStoragePort } from "core/domain/language/outputs/language-storage-port";
import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class LanguagesClientAdapterMock implements LanguageStoragePort {
  constructor() {}

  routes = {};

  getLanguages = mockHttpStorageResponse<LanguageStoragePort["getLanguages"]>;
}
