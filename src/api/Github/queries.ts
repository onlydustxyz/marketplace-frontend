import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { API_PATH } from "src/api/ApiPath";
import { GITHUB_TAGS } from "./tags";
import { components } from "src/__generated/api";

export type useInstallationByIdResponse = components["schemas"]["InstallationResponse"];

const useInstallationById = ({
  params,
  options = {},
}: UseQueryProps<useInstallationByIdResponse, { installation_id?: string }>) => {
  return useBaseQuery<useInstallationByIdResponse>({
    resourcePath: API_PATH.GITHUB_INSTALLATIONS(params?.installation_id || ""),
    enabled: !!params?.installation_id,
    tags: GITHUB_TAGS.installation(params?.installation_id || ""),
    ...options,
  });
};

export type UseOrganizationsByGithubUserIdResponse = components["schemas"]["GithubOrganizationResponse"];

const useOrganizationsByGithubUserId = ({
  params,
  options = {},
}: UseQueryProps<UseOrganizationsByGithubUserIdResponse[], unknown>) => {
  return useBaseQuery<UseOrganizationsByGithubUserIdResponse[]>({
    resourcePath: API_PATH.GITHUB_ORGANIZATIONS_BY_USERID,
    tags: GITHUB_TAGS.organizations(0),
    ...options,
  });
};

export default { useInstallationById, useOrganizationsByGithubUserId };
