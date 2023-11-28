import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { UseInfiniteBaseQueryProps, useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { PROJECT_TAGS } from "./tags";
import { QueryParams } from "src/utils/getEndpointUrl";
import { WorkItemType } from "src/__generated/graphql";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export type UseGetProjectBySlugResponse = components["schemas"]["ProjectResponse"];

const useGetProjectBySlug = ({
  params,
  options = {},
}: UseQueryProps<UseGetProjectBySlugResponse, { slug?: string }>) => {
  return useBaseQuery<UseGetProjectBySlugResponse>({
    resourcePath: API_PATH.PROJECTS_BY_SLUG(params?.slug || ""),
    tags: PROJECT_TAGS.detail_by_slug(params?.slug || ""),
    callbackTags: result => {
      return PROJECT_TAGS.detail_by_id(result?.id || "");
    },
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
  pageSize?: number;
}

const useRewardableItemsInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<UseRewardableItemsInfiniteListResponse, RewardableItemsInfiniteListParams>) => {
  return useInfiniteBaseQuery<UseRewardableItemsInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_REWARDABLE_ITEMS(params?.projectId || ""),
      tags: PROJECT_TAGS.rewardable_items(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 15,
    },
    options
  );
};

interface RewardableItemsQueryParamsProps {
  type?: WorkItemType;
  githubUserId?: number;
  ignoredItemsIncluded?: boolean;
  search?: string;
}

export function useRewardableItemsQueryParams(props: RewardableItemsQueryParamsProps) {
  const { type, githubUserId, ignoredItemsIncluded, search } = props;

  const [includeIgnoredItems, setIncludeIgnoredItems] = useState(ignoredItemsIncluded || false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debounceSearch = useCallback(
    debounce(newSearch => {
      setDebouncedSearch(newSearch);
    }, 300),
    []
  );

  useEffect(() => {
    if (typeof search === "string") {
      debounceSearch(search);
    }
  }, [search, debounceSearch]);

  const queryParams: QueryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (type) params["type"] = type;
    if (debouncedSearch) params["search"] = debouncedSearch;
    if (includeIgnoredItems !== undefined) params["include_ignored_items"] = includeIgnoredItems.toString();
    if (githubUserId) params["githubUserId"] = githubUserId.toString();

    return params;
  }, [type, debouncedSearch, includeIgnoredItems, githubUserId]);

  return {
    queryParams,
    setIncludeIgnoredItems,
  };
}

export type UseProjectContributorsInfiniteListResponse = components["schemas"]["ContributorsPageResponse"];

interface ProjectContributorsInfiniteListParams {
  projectId: string;
  queryParams?: QueryParams;
  pageSize?: number;
}

const useProjectContributorsInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<UseProjectContributorsInfiniteListResponse, ProjectContributorsInfiniteListParams>) => {
  return useInfiniteBaseQuery<UseProjectContributorsInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_CONTRIBUTORS(params?.projectId || ""),
      tags: PROJECT_TAGS.contributors(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 10,
    },
    options
  );
};

type UseCompletedRewardableItemsResponse = components["schemas"]["AllRewardableItemsResponse"];
export type CompletedRewardableItem = components["schemas"]["AllRewardableItemsResponse"];

const useCompletedRewardableItems = ({
  params,
  options = {},
}: UseQueryProps<UseCompletedRewardableItemsResponse, { projectId?: string; githubUserId?: string }>) => {
  return useBaseQuery<UseCompletedRewardableItemsResponse>({
    resourcePath: API_PATH.PROJECT_COMPLETED_REWARDABLE_ITEMS(params?.projectId ?? ""),
    enabled: !!params?.projectId && !!params?.githubUserId,
    queryParams: { githubUserId: params?.githubUserId ?? "" },
    tags: PROJECT_TAGS.completed_rewardable_items(params?.projectId ?? ""),
    ...options,
  });
};

export default {
  useGetProjectBySlug,
  useGetProjectContributionDetail,
  useInfiniteList,
  useRewardableItemsInfiniteList,
  useRewardableItemsQueryParams,
  useProjectContributorsInfiniteList,
  useCompletedRewardableItems,
};
