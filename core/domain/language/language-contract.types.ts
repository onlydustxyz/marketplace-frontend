/* --------------------------------- Get hackathons -------------------------------- */
import { LanguageInterface } from "core/domain/language/models/language-model";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components } from "src/__generated/api";

export type GetLanguagesResponse = components["schemas"]["LanguagesResponse"];

export type GetLanguagesPortResponse = HttpStorageResponse<
  Omit<GetLanguagesResponse, "languages"> & { languages: LanguageInterface[] }
>;

export type GetLanguagesPortParams = HttpClientParameters<object>;
