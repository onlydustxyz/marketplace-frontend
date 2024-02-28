import { BASE_API_V1, BASE_API_V2 } from "src/api/ApiPath";

export const BILLING_PROFILES_PATH = {
  ME_BILLING_PROFILES: BASE_API_V2("me/billing-profiles"),
  ROOT: BASE_API_V1("billing-profiles/"),
  BY_ID: (id: string) => BASE_API_V1(`billing-profiles/${id}/`),
  PAYOUT: (id: string) => BASE_API_V1(`billing-profiles/${id}/payout-info`),
  COWORKERS: (id: string) => BASE_API_V1(`billing-profiles/${id}/coworkers`),
  COWORKER_BY_ID: (id: string, coworkerId: string) => BASE_API_V1(`billing-profiles/${id}/coworkers/${coworkerId}`),
};
