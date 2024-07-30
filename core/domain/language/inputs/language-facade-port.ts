import { GetLanguagesPortParams, GetLanguagesPortResponse } from "core/domain/language/language-contract.types";

export interface LanguageFacadePort {
  getLanguages(p: GetLanguagesPortParams): GetLanguagesPortResponse;
}
