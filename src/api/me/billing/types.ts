import { Key } from "src/hooks/useIntl";

import { TIcon } from "components/layout/icon/icon.types";

export namespace MeBillingTypes {
  export interface statusMapping {
    type: "error" | "warning" | "success";
    label: Key;
    icon: TIcon.Props;
  }
}
