import { PropsWithChildren } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TBillingProfilesSelector {
  export interface Data {
    name: string;
    icon: TIcon.Props;
    iconColor: BillingProfilesTypes.iconColor;
    id: string;
    enabled: boolean;
    hasPendingInvitation: boolean;
  }
  export interface Props extends PropsWithChildren {
    data?: Data[];
    projectId?: string;
    onSelect?: (id: string) => void;
  }
}
