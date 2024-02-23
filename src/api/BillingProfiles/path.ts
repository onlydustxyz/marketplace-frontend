import { BASE_API_V1, BASE_API_V2 } from "src/api/ApiPath";

export const BILLING_PROFILES_PATH = {
  meBillingProfiles: BASE_API_V2("me/billing-profiles"),
  root: BASE_API_V1("billing-profiles/"),
  byId: (id: string) => BASE_API_V1(`billing-profiles/${id}/`),
};
