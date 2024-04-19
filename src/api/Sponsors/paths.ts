import { BASE_API_V1 } from "src/api/ApiPath";

export const SponsorPaths = {
  SPONSOR_BY_ID: (id: string) => BASE_API_V1(`sponsors/${id}`),
  SPONSOR_TRANSACTIONS: (id: string) => BASE_API_V1(`sponsors/${id}/transactions`),
};
