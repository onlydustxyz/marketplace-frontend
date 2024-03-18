import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

import { TBillingInviteTeamMember } from "../../billing-invite-team-member.types";

export namespace TCheckboxItem {
  export interface Props {
    title: ReactNode;
    description: ReactNode;
    icon: TIcon.Props;
    selected: boolean;
    onChange: (value: TBillingInviteTeamMember.Choice) => void;
    value: TBillingInviteTeamMember.Choice;
  }
}
