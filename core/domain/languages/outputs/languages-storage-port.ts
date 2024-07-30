import { GetLanguagesPortParams, GetLanguagesPortResponse } from "core/domain/languages/languages-contract.types";

export interface LanguagesStoragePort {
  routes: Record<string, string>;
  getLanguages(p: GetLanguagesPortParams): GetLanguagesPortResponse;
}
