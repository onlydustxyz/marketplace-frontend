import { components } from "src/__generated/api";

import { TIcon } from "components/layout/icon/icon.types";

import { Key } from "hooks/translate/use-translate";

export namespace BillingProfilesTypes {
  export type status = components["schemas"]["BillingProfileResponse"]["status"];

  export type BillingProfile = components["schemas"]["ShortBillingProfileResponse"];
  export enum type {
    Individual = "INDIVIDUAL",
    SelfEmployed = "SELF_EMPLOYED",
    Company = "COMPANY",
  }

  export type typeUnion = components["schemas"]["BillingProfileResponse"]["type"];

  export enum ROLE {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
  }

  export type roleUnion = components["schemas"]["BillingProfileResponse"]["me"]["role"];

  export interface profileTypeMapping {
    icon: TIcon.Props;
  }

  export interface statusMapping {
    type: "error" | "warning" | "success";
    label: Key;
    icon: TIcon.Props;
  }
}
