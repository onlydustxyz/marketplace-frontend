import { Key } from "hooks/translate/use-translate";

export namespace TUseMenu {
  export const ERROR_COLORS = {
    WARNING: "WARNING",
    ERROR: "ERROR",
    DEFAULT: "DEFAULT",
  } as const;

  export interface Return {
    labelToken: Key;
    redirection: string;
    errorColor: keyof typeof ERROR_COLORS;
    error?: boolean;
  }
}
