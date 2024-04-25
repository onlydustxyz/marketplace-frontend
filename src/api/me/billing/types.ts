import { TIcon } from "components/layout/icon/icon.types";

import { Key } from "hooks/translate/use-translate";

export namespace MeBillingTypes {
  export interface statusMapping {
    type: "error" | "warning" | "success";
    label: Key;
    icon: TIcon.Props;
  }
}
