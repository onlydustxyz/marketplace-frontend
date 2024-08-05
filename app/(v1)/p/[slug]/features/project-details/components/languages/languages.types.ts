import { components } from "src/__generated/api";

export namespace TLanguages {
  type Language = components["schemas"]["LanguageResponse"];
  export interface Props {
    languages?: Language[] | null;
  }
}
