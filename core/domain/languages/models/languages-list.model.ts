import { Language } from "core/domain/languages/models/language-model";

import { components } from "src/__generated/api";

export type ListLanguagesResponse = components["schemas"]["LanguagesResponse"];

export interface ListLanguageInterface extends ListLanguagesResponse {}

export class ListLanguage implements ListLanguageInterface {
  languages!: ListLanguagesResponse["languages"];

  constructor(props: ListLanguagesResponse) {
    this.languages = props.languages.map(language => new Language(language));
    Object.assign(this, props);
  }
}
