import { MeTypes } from "src/api/me/types";

export namespace TVerifyButton {
  export interface Props {
    type: `${MeTypes.billingProfileType}`;
    id: string;
  }
}
