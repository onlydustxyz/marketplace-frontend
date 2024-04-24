import { BASE_API_V1 } from "src/api/ApiPath";

export const SPONSOR_PATHS = {
  SPONSOR_BY_ID: (id: string) => BASE_API_V1(`sponsors/${id}`),
  SPONSOR_TRANSACTIONS: (id: string) => BASE_API_V1(`sponsors/${id}/transactions`),
  SPONSOR_ALLOCATION: (id: string) => BASE_API_V1(`sponsors/${id}/allocate`),
};
