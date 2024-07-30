import { GetLanguagesPortParams, GetLanguagesPortResponse } from "core/domain/languages/languages-contract.types";

export interface LanguagesFacadePort {
  getLanguages(p: GetLanguagesPortParams): GetLanguagesPortResponse;
}
