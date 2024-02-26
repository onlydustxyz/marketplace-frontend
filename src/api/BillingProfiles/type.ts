import { TIcon } from "components/layout/icon/icon.types";

export namespace BillingProfilesTypes {
  export enum type {
    Individual = "INDIVIDUAL",
    SelfEmployed = "SELF_EMPLOYED",
    Company = "COMPANY",
  }

  export enum ROLE {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
  }

  export interface profileTypeMapping {
    icon: TIcon.Props;
  }
}
