import { API_PATH } from "src/api/ApiPath";
import { CONTRIBUTIONS_TAGS } from "./tags";
import { components } from "src/__generated/api";
import { useInfiniteBaseQuery } from "../useInfiniteBaseQuery";

export type UseMyContributionsResponse = components["schemas"]["ContributionPageResponse"];

const useMyContributions = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<UseMyContributionsResponse>>[1] = {}
) => {
  return useInfiniteBaseQuery<UseMyContributionsResponse>(
    {
      ...params,
      resourcePath: API_PATH.MY_CONTRIBUTIONS,
      tags: CONTRIBUTIONS_TAGS.all,
    },
    options
  );
};

export default { useMyContributions };
