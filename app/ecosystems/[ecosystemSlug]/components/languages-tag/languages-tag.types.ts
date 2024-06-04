import { components } from "src/__generated/api";

export namespace TLanguagesTag {
  type Language = components["schemas"]["LanguageResponse"];
  export interface Props {
    languages?: Language[] | null;
  }
}
