import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { API_PATH } from "src/api/ApiPath";
import { PROJECT_TAGS } from "./tags";
import { components } from "src/__generated/api";

export type UseGetProjectBySlugResponse = components["schemas"]["ProjectResponse"];

const useGetProjectBySlug = ({
  params,
  options = {},
}: UseQueryProps<UseGetProjectBySlugResponse, { slug?: string }>) => {
  return useBaseQuery<UseGetProjectBySlugResponse>({
    resourcePath: API_PATH.PROJECTS_BY_SLUG(params?.slug || ""),
    enabled: !!params?.slug,
    tags: PROJECT_TAGS.detail_by_slug(params?.slug || ""),
    ...options,
  });
};

export default { useGetProjectBySlug };
