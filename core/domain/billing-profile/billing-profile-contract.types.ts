import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components } from "src/__generated/api";

export type BillingProfileTypeUnion = components["schemas"]["BillingProfileResponse"]["type"];

export enum BillingProfileTyp {
  Individual = "INDIVIDUAL",
  SelfEmployed = "SELF_EMPLOYED",
  Company = "COMPANY",
}

/* --------------------------------- Create Billing profile -------------------------------- */

export type CreateBillingProfileBody = components["schemas"]["BillingProfileTypeRequest"];

export type CreateBillingProfilePortParams = HttpClientParameters<object>;

export type CreateBillingProfilePortResponse = HttpStorageResponse;
