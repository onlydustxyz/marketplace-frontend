import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";

import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { ME_PATH } from "./path";
import { ME_TAGS } from "./tags";

export type UseGetUserMeResponse = components["schemas"]["GetMeResponse"];

const useGetMe = ({ options = {} }: UseQueryProps<UseGetUserMeResponse, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetUserMeResponse>({
    resourcePath: ME_PATH.ROOT,
    tags: ME_TAGS.user,
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
    // Current user doesn't need to be refreshed automatically, otherwise some components could re-render unexpectedly (ex:lead-guard)
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export type UseMyRewardsInfiniteListResponse = components["schemas"]["MyRewardsPageResponse"];

const useMyRewardsInfiniteList = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>>[1] = {}
) => {
  const { isAuthenticated } = useAuth0();

  return useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>(
    {
      ...params,
      resourcePath: ME_PATH.REWARDS,
      tags: ME_TAGS.rewards(),
      pageSize: 15,
    },
    { ...options, enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled) }
  );
};

export type UseMyContributedProjectsResponse = components["schemas"]["ProjectListResponse"];

const useMyContributedProjects = ({
  params,
  options = {},
}: UseQueryProps<UseMyContributedProjectsResponse, { repositories?: string }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseMyContributedProjectsResponse>({
    resourcePath: ME_PATH.CONTRIBUTED_PROJECTS,
    tags: ME_TAGS.contributedProjects(),
    queryParams: params,
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseMyContributedReposResponse = components["schemas"]["ContributedReposResponse"];

const useMyContributedRepos = ({
  params,
  options = {},
}: UseQueryProps<UseMyContributedReposResponse, { projects?: string }>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseMyContributedReposResponse>({
    resourcePath: ME_PATH.CONTRIBUTED_REPOS,
    queryParams: params,
    tags: ME_TAGS.contributedRepos(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGithubOrganizationsResponse = components["schemas"]["GithubOrganizationResponse"];

const useGithubOrganizations = ({ options = {} }: UseQueryProps<UseGithubOrganizationsResponse[], unknown>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseGithubOrganizationsResponse[]>({
    resourcePath: ME_PATH.GITHUB_ORGANIZATIONS,
    tags: ME_TAGS.githubOrganization(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMyProfileInfoResponse = components["schemas"]["PrivateUserProfileResponse"];

const useGetMyProfileInfo = ({ options = {} }: UseQueryProps<UseGetMyProfileInfoResponse, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetMyProfileInfoResponse>({
    resourcePath: ME_PATH.PROFILE,
    tags: ME_TAGS.profile(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMeRewardCurrencies = components["schemas"]["CurrencyListResponse"];

const useGetMeRewardCurrencies = ({ options = {} }: UseQueryProps<UseGetMeRewardCurrencies, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetMeRewardCurrencies>({
    resourcePath: ME_PATH.REWARDS_CURRENCIES,
    tags: ME_TAGS.rewarded_currencies(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMeRewardProjects = components["schemas"]["ProjectListResponse"];

const useGetMeRewardProjects = ({ options = {} }: UseQueryProps<UseGetMeRewardProjects, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetMeRewardProjects>({
    resourcePath: ME_PATH.REWARDS_PROJECTS,
    tags: ME_TAGS.rewarded_projects(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

const useSyncGithubAccount = ({ options = {} }: UseQueryProps<unknown, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<unknown>({
    resourcePath: ME_PATH.SYNC_GITHUB_PROFILE,
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetPayoutPreferences = components["schemas"]["PayoutPreferencesItemResponse"][];
const useGetPayoutPreferences = ({ options = {} }: UseQueryProps<UseGetPayoutPreferences, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetPayoutPreferences>({
    resourcePath: ME_PATH.PAYOUT_PREFERENCES,
    tags: ME_TAGS.payoutPreferences(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export default {
  useGetMe,
  useMyRewardsInfiniteList,
  useSyncGithubAccount,
  useGetMeRewardProjects,
  useMyContributedProjects,
  useMyContributedRepos,
  useGithubOrganizations,
  useGetMyProfileInfo,
  useGetMeRewardCurrencies,
  useGetPayoutPreferences,
};
