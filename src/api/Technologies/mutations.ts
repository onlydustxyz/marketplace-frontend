import { components } from "src/__generated/api";
import { API_PATH } from "src/api/ApiPath";

import { UseMutationProps, useBaseMutation } from "../useBaseMutation";

export type UseAddTechnologyBody = components["schemas"]["SuggestTechnologyRequest"];

const useAddTechnology = ({ options = {} }: UseMutationProps<unknown, unknown, UseAddTechnologyBody>) => {
  return useBaseMutation<UseAddTechnologyBody, unknown>({
    resourcePath: API_PATH.TECHNOLOGIES,
    method: "POST",
    // TODO : Waiting for backend
    // invalidatesTags: [{ queryKey: TECHNOLOGIES_TAGS.all, exact: false }],
    ...options,
  });
};

export default {
  useAddTechnology,
};
