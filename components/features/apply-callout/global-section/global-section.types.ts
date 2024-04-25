import { Key } from "src/hooks/useIntl";

export namespace TApplyGlobalSection {
  export interface Props {
    formDescription?: Key;
    buttonNotConnected: Key;
    buttonConnected: Key;
    onApply: () => void;
    alreadyApplied?: boolean;
  }
}
