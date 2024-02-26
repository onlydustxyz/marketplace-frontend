import { components } from "src/__generated/api";
import { Key } from "src/hooks/useIntl";

import { TIcon } from "components/layout/icon/icon.types";

export namespace BillingProfilesTypes {
  export type status = components["schemas"]["KYBResponse"]["status"] | components["schemas"]["KYCResponse"]["status"];
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

  export interface profileTypeMapping {
    icon: TIcon.Props;
  }

  export interface statusMapping {
    type: "error" | "warning" | "success";
    label: Key;
    icon: TIcon.Props;
  }
}
