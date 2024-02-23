import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

import { TBillingInviteTeamMember } from "../../billing-invite-team-member.types";

export namespace TCheckboxItem {
  export interface Props {
    selected: boolean;
    disabled: boolean;
    icon: TIcon.Props;
    title: ReactNode;
    onChange: (value: TBillingInviteTeamMember.Choice) => void;
    value: TBillingInviteTeamMember.Choice;
  }
}
