import { API_PATH } from "src/api/ApiPath";
import { UseQueryProps, useBaseQuery } from "src/api/useBaseQuery";
import { TECHNOLOGIES_TAGS } from "./tags";

export type UseGetTechnologiesResponse = { technologies: string[] };

const useGetTechnologies = ({ options = {} }: UseQueryProps<UseGetTechnologiesResponse>) => {
  return useBaseQuery<UseGetTechnologiesResponse>({
    resourcePath: API_PATH.TECHNOLOGIES,
    tags: TECHNOLOGIES_TAGS.all,
    ...options,
  });
};

export default {
  useGetTechnologies,
};
