import { Key } from "src/hooks/useIntl";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace MeBillingTypes {
  export interface statusMapping {
    type: "error" | "warning" | "success";
    label: Key;
    icon: RemixIconsName;
  }
}
