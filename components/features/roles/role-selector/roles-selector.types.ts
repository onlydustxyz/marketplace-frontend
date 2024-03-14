import { PropsWithChildren } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TRolesSelector {
  export enum roleType {
    Admin = "ADMIN",
    Member = "MEMBER",
  }

  export type roleUnion = `${roleType}`;
  export interface Data {
    role: string;
    icon: TIcon.Props;
  }
  export interface Props extends PropsWithChildren {
    data?: Data[];
    activeRole: TRolesSelector.roleUnion;
    isYou?: boolean;
    billingProfileId?: string;
    onSelect?: (id: string) => void;
  }
}
