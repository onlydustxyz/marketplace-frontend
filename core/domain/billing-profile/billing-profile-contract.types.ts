import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components } from "src/__generated/api";

/* --------------------------------- Create Billing profile -------------------------------- */

export type CreateBillingProfileBody = components["schemas"]["BillingProfileRequest"];

export type CreateBillingProfileResponse = components["schemas"]["BillingProfileResponse"];

export type CreateBillingProfilePortParams = HttpClientParameters<object>;

export type CreateBillingProfilePortResponse = HttpStorageResponse;
