import { UseBillingProfileResponse } from "src/api/me/billing/queries";
import { UseGetUserMeResponse } from "src/api/me/queries";
import { MeTypes } from "src/api/me/types";

export namespace TUseBillingProfile {
  export interface Return {
    billingProfile?: UseBillingProfileResponse;
    user?: UseGetUserMeResponse;
    profileType: MeTypes.billingProfileType;
    isIndividual: boolean;
    isCompany: boolean;
    validBillingProfile: boolean;
  }
}
