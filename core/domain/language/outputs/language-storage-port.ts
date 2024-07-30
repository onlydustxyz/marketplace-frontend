import { GetLanguagesPortParams, GetLanguagesPortResponse } from "core/domain/language/language-contract.types";

export interface LanguageStoragePort {
  routes: Record<string, string>;
  getLanguages(p: GetLanguagesPortParams): GetLanguagesPortResponse;
}
