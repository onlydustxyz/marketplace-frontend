import { components, operations } from "src/__generated/api";

export type ActivityAllQueryParams = Omit<
  operations["getPublicActivity"]["parameters"]["query"],
  "pageIndex" | "pageSize"
>;

export type GetActivityPageResponse = components["schemas"]["PublicActivityPageResponse"];
export type GetActivityItem = components["schemas"]["PublicActivityPageItemResponse"];
