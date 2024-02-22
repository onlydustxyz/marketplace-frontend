import { TIcon } from "components/layout/icon/icon.types";

export namespace BillingProfilesTypes {
  export enum type {
    Individual = "INDIVIDUAL",
    SelfEmployed = "SELF_EMPLOYED",
    Company = "COMPANY",
  }

  export interface profileTypeMapping {
    icon: TIcon.Props;
  }
}
