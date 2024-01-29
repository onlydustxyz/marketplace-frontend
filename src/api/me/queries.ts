import { useAuth0 } from "@auth0/auth0-react";

import { components } from "src/__generated/api";

import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { ME_TAGS } from "./tags";

export type UseGetUserMeResponse = components["schemas"]["GetMeResponse"];

const useGetMe = ({ options = {} }: UseQueryProps<UseGetUserMeResponse, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetUserMeResponse>({
    resourcePath: API_PATH.ME,
    tags: ME_TAGS.user,
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
    refetchOnWindowFocus: false,
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
      resourcePath: API_PATH.ME_REWARDS,
      tags: ME_TAGS.rewards(),
      pageSize: 15,
    },
    { ...options, enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled) }
  );
};

export type UseMyContributionsResponse = components["schemas"]["ContributionPageResponse"];

const useMyContributions = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<UseMyContributionsResponse>>[1] = {}
) => {
  const { isAuthenticated } = useAuth0();
  return useInfiniteBaseQuery<UseMyContributionsResponse>(
    {
      ...params,
      resourcePath: API_PATH.MY_CONTRIBUTIONS,
      tags: ME_TAGS.contributions([params.queryParams]),
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
    resourcePath: API_PATH.MY_CONTRIBUTED_PROJECTS,
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
    resourcePath: API_PATH.MY_CONTRIBUTED_REPOS,
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
    resourcePath: API_PATH.ME_GITHUB_ORGANIZATIONS,
    tags: ME_TAGS.githubOrganization(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMyPayoutInfoResponse = components["schemas"]["UserPayoutInformationResponse"];

const useGetMyPayoutInfo = ({ options = {} }: UseQueryProps<UseGetMyPayoutInfoResponse, undefined>) => {
  const { isAuthenticated } = useAuth0();
  return useBaseQuery<UseGetMyPayoutInfoResponse>({
    resourcePath: API_PATH.MY_PAYOUT_INFO,
    tags: ME_TAGS.payoutInfo(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMyProfileInfoResponse = components["schemas"]["PrivateUserProfileResponse"];

const useGetMyProfileInfo = ({ options = {} }: UseQueryProps<UseGetMyProfileInfoResponse, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetMyProfileInfoResponse>({
    resourcePath: API_PATH.ME_PROFILE,
    tags: ME_TAGS.profile(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMeRewardCurrencies = components["schemas"]["CurrencyListResponse"];

const useGetMeRewardCurrencies = ({ options = {} }: UseQueryProps<UseGetMeRewardCurrencies, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetMeRewardCurrencies>({
    resourcePath: API_PATH.ME_REWARDS_CURRENCIES,
    tags: ME_TAGS.rewarded_currencies(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMeRewardProjects = components["schemas"]["ProjectListResponse"];

const useGetMeRewardProjects = ({ options = {} }: UseQueryProps<UseGetMeRewardProjects, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetMeRewardProjects>({
    resourcePath: API_PATH.ME_REWARDS_PROJECTS,
    tags: ME_TAGS.rewarded_projects(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export type UseGetMePendingInvoices = components["schemas"]["MyRewardsListResponse"];
const useGetMePendingInvoices = ({ options = {} }: UseQueryProps<UseGetMePendingInvoices, undefined>) => {
  const { isAuthenticated } = useAuth0();

  return useBaseQuery<UseGetMePendingInvoices>({
    resourcePath: API_PATH.ME_REWARDS_PENDING_INVOICE,
    tags: ME_TAGS.rewarded_pending_invoice(),
    ...options,
    enabled: isAuthenticated && (options.enabled === undefined ? true : options.enabled),
  });
};

export default {
  useGetMe,
  useMyRewardsInfiniteList,
  useGetMeRewardProjects,
  useMyContributions,
  useMyContributedProjects,
  useMyContributedRepos,
  useGithubOrganizations,
  useGetMePendingInvoices,
  useGetMyPayoutInfo,
  useGetMyProfileInfo,
  useGetMeRewardCurrencies,
};
