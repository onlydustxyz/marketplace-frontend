import { PropsWithChildren } from "react";

import { TSettingsHeader } from "app/(v1)/settings/components/settings-header/settings-header.types";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

export namespace TBillingHeader {
  type HeaderArgsKeys = BillingProfilesTypes.typeUnion | BillingProfilesTypes.ROLE.MEMBER;

  export type HeaderArgs = {
    [key in HeaderArgsKeys]: TSettingsHeader.Props;
  };

  export interface Props extends PropsWithChildren {}
}
