import { API_PATH } from "src/api/ApiPath";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { TECHNOLOGIES_TAGS } from "./tags";

export type UseGetTechnologiesResponse = { [key: string]: Record<string, never> };

// TODO : Waiting for backend
const useGetTechnologies = ({ params, options = {} }: UseQueryProps<UseGetTechnologiesResponse, { slug?: string }>) => {
  return useBaseQuery<UseGetTechnologiesResponse>({
    resourcePath: API_PATH.TECHNOLOGIES,
    tags: TECHNOLOGIES_TAGS.all,
    enabled: !!params?.slug,
    ...options,
  });
};

export default {
  useGetTechnologies,
};
