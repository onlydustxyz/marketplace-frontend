import { Language } from "core/domain/languages/models/language-model";

import { components } from "src/__generated/api";

export type LanguageListsResponse = components["schemas"]["LanguagesResponse"];

export interface LanguageListInterface extends LanguageListsResponse {}

export class LanguageList implements LanguageListInterface {
  languages!: LanguageListsResponse["languages"];

  constructor(props: LanguageListsResponse) {
    Object.assign(this, props);

    this.languages = props.languages.map(language => new Language(language));
  }
}
