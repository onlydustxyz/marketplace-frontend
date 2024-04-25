import { components } from "src/__generated/api";

import { TIcon } from "components/layout/icon/icon.types";

import { Key } from "hooks/translate/use-translate";

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
