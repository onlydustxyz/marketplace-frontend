import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { API_PATH } from "src/api/ApiPath";
import { GITHUB_TAGS } from "./tags";
import { components } from "src/__generated/api";

export type useInstallationByIdResponse = components["schemas"]["InstallationResponse"];

export interface useGithubUsers {
  id: number;
  login: string;
  avatarUrl: string;
  isRegistered: boolean;
}

const useInstallationById = ({
  params,
  options,
}: UseQueryProps<useInstallationByIdResponse, { installation_id?: string }>) => {
  return useBaseQuery<useInstallationByIdResponse>({
    resourcePath: API_PATH.GITHUB_INSTALLATIONS(params?.installation_id || ""),
    pathParam: params,
    method: "GET",
    enabled: !!params?.installation_id,
    tags: GITHUB_TAGS.installation(params?.installation_id || ""),
    ...(options || {}),
  });
};

const useUsers = ({ params, options }: UseQueryProps<useGithubUsers[], { search?: string }>) => {
  return useBaseQuery<useGithubUsers[]>({
    resourcePath: API_PATH.GITHUB_USERS,
    pathParam: params,
    queryParams: params,
    method: "GET",
    tags: GITHUB_TAGS.users(),
    retry: 0,
    ...(options || {}),
  });
};

export default { useInstallationById, useUsers };
