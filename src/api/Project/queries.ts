import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { UseInfiniteBaseQueryProps, useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { PROJECT_TAGS } from "./tags";
import { QueryParams } from "src/utils/getEndpointUrl";

export type UseGetProjectBySlugResponse = components["schemas"]["ProjectResponse"];

const useGetProjectBySlug = ({
  params,
  options = {},
}: UseQueryProps<UseGetProjectBySlugResponse, { slug?: string }>) => {
  return useBaseQuery<UseGetProjectBySlugResponse>({
    resourcePath: API_PATH.PROJECTS_BY_SLUG(params?.slug || ""),
    tags: PROJECT_TAGS.detail_by_slug(params?.slug || ""),
    callbackTags: result => PROJECT_TAGS.detail_by_id(result?.id || ""),
    enabled: !!params?.slug,
    ...options,
  });
};

export type UseGetProjectContributionDetailResponse = components["schemas"]["ContributionDetailsResponse"];

const useGetProjectContributionDetail = ({
  params,
  options = {},
}: UseQueryProps<UseGetProjectContributionDetailResponse, { projectId?: string; contributionId?: string }>) => {
  return useBaseQuery<UseGetProjectContributionDetailResponse>({
    resourcePath: API_PATH.PROJECT_CONTRIBUTION_DETAIL(params?.projectId ?? "", params?.contributionId ?? ""),
    enabled: !!params?.projectId && !!params?.contributionId,
    tags: PROJECT_TAGS.contribution_detail(params?.projectId ?? "", params?.contributionId ?? ""),
    ...options,
  });
};

export type UseInfiniteListResponse = components["schemas"]["ProjectPageResponse"];

const useInfiniteList = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<UseInfiniteListResponse>>[1] = {}
) => {
  return useInfiniteBaseQuery<UseInfiniteListResponse>(
    {
      ...params,
      resourcePath: API_PATH.PROJECTS,
      tags: PROJECT_TAGS.all,
    },
    options
  );
};

export type UseRewardableItemsInfiniteListResponse = components["schemas"]["RewardableItemsPageResponse"];
export type RewardableItem = components["schemas"]["RewardableItemResponse"];

interface RewardableItemsInfiniteListParams {
  projectId: string;
  queryParams?: QueryParams;
}

const useRewardableItemsInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<UseRewardableItemsInfiniteListResponse, RewardableItemsInfiniteListParams>) => {
  return useInfiniteBaseQuery<UseRewardableItemsInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_REWARDABLE_ITEMS(params?.projectId || ""),
      tags: PROJECT_TAGS.rewardable_items([params?.projectId]),
      queryParams: params?.queryParams,
      pageSize: 10,
    },
    options
  );
};

export default {
  useGetProjectBySlug,
  useGetProjectContributionDetail,
  useInfiniteList,
  useRewardableItemsInfiniteList,
};
