import { Key } from "hooks/translate/use-translate";

export namespace TApplyGlobalSection {
  export interface Props {
    formDescription?: Key;
    buttonNotConnected: Key;
    buttonConnected: Key;
    onApply: () => void;
    alreadyApplied?: boolean;
    isLoading?: boolean;
  }
}
