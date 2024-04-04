import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";

export namespace TTabs {
  export interface Props {
    id: string;
    type?: UseGetBillingProfileById["type"];
  }
}
