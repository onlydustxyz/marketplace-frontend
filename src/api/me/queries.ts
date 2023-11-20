import { components } from "src/__generated/api";
import { API_PATH } from "../ApiPath";
import { UseQueryProps, useBaseQuery } from "../useBaseQuery";
import { useInfiniteBaseQuery } from "../useInfiniteBaseQuery";
import { ME_TAGS } from "./tags";

export type UseGetUserMeResponse = components["schemas"]["GetMeResponse"];

const useGetMe = ({ options = {} }: UseQueryProps<UseGetUserMeResponse, undefined>) => {
  return useBaseQuery<UseGetUserMeResponse>({
    resourcePath: API_PATH.ME,
    tags: ME_TAGS.all,
    ...options,
  });
};

export type UseMyRewardsInfiniteListResponse = components["schemas"]["MyRewardsPageResponse"];

const useMyRewardsInfiniteList = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>>[1] = {}
) => {
  return useInfiniteBaseQuery<UseMyRewardsInfiniteListResponse>(
    {
      ...params,
      resourcePath: API_PATH.ME_REWARDS,
      tags: ME_TAGS.rewards(),
      pageSize: 15,
    },
    options
  );
};

export type UseMyContributionsResponse = components["schemas"]["ContributionPageResponse"];

const useMyContributions = (
  params: Partial<Parameters<typeof useInfiniteBaseQuery>[0]>,
  options: Parameters<typeof useInfiniteBaseQuery<UseMyContributionsResponse>>[1] = {}
) => {
  return useInfiniteBaseQuery<UseMyContributionsResponse>(
    {
      ...params,
      resourcePath: API_PATH.MY_CONTRIBUTIONS,
      tags: ME_TAGS.contributions([params.queryParams]),
    },
    options
  );
};

export type UseMyContributedProjectsResponse = components["schemas"]["ContributedProjectsResponse"];

const useMyContributedProjects = ({
  params,
  options = {},
}: UseQueryProps<UseMyContributedProjectsResponse, { repositories?: string }>) => {
  return useBaseQuery<UseMyContributedProjectsResponse>({
    resourcePath: API_PATH.MY_CONTRIBUTED_PROJECTS,
    tags: ME_TAGS.contributedProjects(),
    queryParams: params,
    ...options,
  });
};

export type UseMyContributedReposResponse = components["schemas"]["ContributedReposResponse"];

const useMyContributedRepos = ({
  params,
  options = {},
}: UseQueryProps<UseMyContributedReposResponse, { projects?: string }>) => {
  return useBaseQuery<UseMyContributedReposResponse>({
    resourcePath: API_PATH.MY_CONTRIBUTED_REPOS,
    queryParams: params,
    tags: ME_TAGS.contributedRepos(),
    ...options,
  });
};

export type UseGithubOrganizationsResponse = components["schemas"]["GithubOrganizationResponse"];

const useGithubOrganizations = ({ options = {} }: UseQueryProps<UseGithubOrganizationsResponse[], unknown>) => {
  return useBaseQuery<UseGithubOrganizationsResponse[]>({
    resourcePath: API_PATH.ME_GITHUB_ORGANIZATIONS,
    tags: ME_TAGS.githubOrganization(),
    ...options,
  });
};

export default {
  useGetMe,
  useMyRewardsInfiniteList,
  useMyContributions,
  useMyContributedProjects,
  useMyContributedRepos,
  useGithubOrganizations,
};
