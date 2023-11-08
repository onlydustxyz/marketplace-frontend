import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { API_PATH } from "src/api/ApiPath";
import { PROJECT_TAGS } from "./tags";
import { components } from "src/__generated/api";

export type useDetailsResponse = components["schemas"]["ProjectResponse"];

const useDetails = ({ params, options = {} }: UseQueryProps<useDetailsResponse, { projectKey?: string }>) => {
  return useBaseQuery<useDetailsResponse>({
    resourcePath: API_PATH.PROJECT_DETAILS(params?.projectKey ?? ""),
    enabled: !!params?.projectKey,
    tags: PROJECT_TAGS.slug(params?.projectKey ?? ""),
    ...options,
  });
};

export default { useDetails };
