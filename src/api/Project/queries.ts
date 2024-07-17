import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { WorkItemType } from "src/types";
import { QueryParams } from "src/utils/getEndpointUrl";

import { UseInfiniteBaseQueryProps, useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { PROJECT_TAGS } from "./tags";

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
    retry: 1,
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
export type ProjectContributorItem = components["schemas"]["ContributorPageItemResponse"];

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

export type UseProjectContributionsInfiniteListResponse = components["schemas"]["ContributionPageResponse"];

interface ProjectContributionsInfiniteListParams {
  projectId: string;
  queryParams?: QueryParams;
  pageSize?: number;
}

const useProjectContributionsInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<UseProjectContributionsInfiniteListResponse, ProjectContributionsInfiniteListParams>) => {
  return useInfiniteBaseQuery<UseProjectContributionsInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_CONTRIBUTIONS(params?.projectId || ""),
      tags: PROJECT_TAGS.contributions(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 10,
    },
    { ...options, enabled: options.enabled && !!params?.projectId }
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

export type UseProjectBudgetResponse = components["schemas"]["ProjectBudgetsResponse"];

const useProjectBudget = ({
  params,
  options = {},
}: UseQueryProps<UseProjectBudgetResponse, { projectId?: string }>) => {
  return useBaseQuery<UseProjectBudgetResponse>({
    resourcePath: API_PATH.PROJECT_BUDGET(params?.projectId ?? ""),
    enabled: !!params?.projectId,
    tags: PROJECT_TAGS.budgets(params?.projectId ?? ""),
    ...options,
  });
};

export type UseProjectContributorsNewcomersInfiniteListResponse = components["schemas"]["ProjectNewcomersPageResponse"];

interface ProjectContributorsInsightsInfiniteListParams {
  projectId: string;
  queryParams?: QueryParams;
  pageSize?: number;
}

const useProjectContributorsNewcomersInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<
  UseProjectContributorsNewcomersInfiniteListResponse,
  ProjectContributorsInsightsInfiniteListParams
>) => {
  return useInfiniteBaseQuery<UseProjectContributorsNewcomersInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_INSIGHTS_CONTRIBUTORS_NEWCOMERS(params?.projectId || ""),
      tags: PROJECT_TAGS.contributors_newcomers(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 6,
    },
    { ...options, enabled: !!params?.projectId }
  );
};

export type UseProjectContributorsMostActivesInfiniteListResponse =
  components["schemas"]["ProjectContributorActivityPageResponse"];

const useProjectContributorsMostActivesInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<
  UseProjectContributorsMostActivesInfiniteListResponse,
  ProjectContributorsInsightsInfiniteListParams
>) => {
  return useInfiniteBaseQuery<UseProjectContributorsMostActivesInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_INSIGHTS_CONTRIBUTORS_MOST_ACTIVES(params?.projectId || ""),
      tags: PROJECT_TAGS.contributors_most_actives(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 5,
    },
    { ...options, enabled: !!params?.projectId }
  );
};

export type UseProjectContributionsStaledInfiniteListResponse = components["schemas"]["ContributionPageResponse"];

const useProjectContributionsStaledInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<
  UseProjectContributionsStaledInfiniteListResponse,
  ProjectContributorsInsightsInfiniteListParams
>) => {
  return useInfiniteBaseQuery<UseProjectContributionsStaledInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_INSIGHTS_CONTRIBUTIONS_STALED(params?.projectId || ""),
      tags: PROJECT_TAGS.contributions_staled(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 5,
    },
    { ...options, enabled: !!params?.projectId }
  );
};

export type UseProjectContributorsChurnedInfiniteListResponse =
  components["schemas"]["ProjectChurnedContributorsPageResponse"];

const useProjectContributorsChurnedInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<
  UseProjectContributorsChurnedInfiniteListResponse,
  ProjectContributorsInsightsInfiniteListParams
>) => {
  return useInfiniteBaseQuery<UseProjectContributorsChurnedInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_INSIGHTS_CONTRIBUTORS_CHURNED(params?.projectId || ""),
      tags: PROJECT_TAGS.contributors_churned(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 6,
    },
    { ...options, enabled: !!params?.projectId }
  );
};

export type UseProjectGoodFirstIssuesInfiniteListResponse = components["schemas"]["GithubIssuePageResponse"];

const useProjectGoodFirstIssuesInfiniteList = ({
  params,
  options = {},
}: UseInfiniteBaseQueryProps<
  UseProjectGoodFirstIssuesInfiniteListResponse,
  { projectId?: string; queryParams?: QueryParams; pageSize?: number }
>) => {
  return useInfiniteBaseQuery<UseProjectGoodFirstIssuesInfiniteListResponse>(
    {
      resourcePath: API_PATH.PROJECT_GOOD_FIRST_ISSUES(params?.projectId || ""),
      tags: PROJECT_TAGS.good_first_issues(params?.projectId || ""),
      queryParams: params?.queryParams,
      pageSize: params?.pageSize || 6,
    },
    { ...options, enabled: !!params?.projectId }
  );
};

export default {
  useGetProjectBySlug,
  useGetProjectContributionDetail,
  useInfiniteList,
  useRewardableItemsInfiniteList,
  useProjectContributorsInfiniteList,
  useProjectContributionsInfiniteList,
  useCompletedRewardableItems,
  useProjectBudget,
  useProjectContributorsNewcomersInfiniteList,
  useProjectContributorsMostActivesInfiniteList,
  useProjectContributionsStaledInfiniteList,
  useProjectContributorsChurnedInfiniteList,
  useProjectGoodFirstIssuesInfiniteList,
};
