import { PropsWithChildren, ReactNode } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TSelectableBillingProfile {
  export interface Props extends PropsWithChildren {
    selected: boolean;
    disabled: boolean;
    icon: TIcon.Props;
    role: BillingProfilesTypes.roleUnion;
    title: ReactNode;
    count: number;
    onChange: (value: string) => void;
    value: string;
  }
}
