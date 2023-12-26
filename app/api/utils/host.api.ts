import { BASE_API_V1 } from "./base.api.ts";

export const API_HOST_NAME = (path: string) =>
  `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}${BASE_API_V1(path)}`;
