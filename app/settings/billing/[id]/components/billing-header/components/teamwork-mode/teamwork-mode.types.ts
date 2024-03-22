import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";

export namespace TTeamworkMode {
  export interface Props {
    type?: UseGetBillingProfileById["type"];
    isSwitchableToSelfEmployed?: boolean;
    id: string;
  }
}
