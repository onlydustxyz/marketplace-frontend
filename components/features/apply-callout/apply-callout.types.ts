import { components } from "src/__generated/api";
import { Key } from "src/hooks/useIntl";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TApplyCallout {
  export type Channel = components["schemas"]["ContactInformation"]["channel"];

  export interface Props {
    icon: TIcon.Props;
    title: Key;
    description?: Key;
    formDescription?: Key;
    buttonNotConnected: Key;
    buttonConnected: Key;
    onApply: () => void;
    alreadyApplied?: boolean;
  }
}
