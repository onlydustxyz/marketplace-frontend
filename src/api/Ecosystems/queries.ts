import { components } from "src/__generated/api";

import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";

export type UseGetEcosystem = components["schemas"]["EcosystemPage"];
const useGetEcosystems = ({
  options = {},
}: UseQueryProps<UseGetEcosystem, { isMine: boolean; projectId?: string; rewardId: string }>) => {
  return useBaseQuery<UseGetEcosystem>({
    resourcePath: API_PATH.ECOSYSTEM,
    method: "GET",
    queryParams: [
      ["pageIndex", "0"],
      ["pageSize", "50"],
    ],
    ...options,
  });
};

export default {
  useGetEcosystems,
};
