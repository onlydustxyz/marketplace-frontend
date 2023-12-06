import { API_PATH } from "src/api/ApiPath";
import { components } from "src/__generated/api";
import { UseMutationProps, useBaseMutation } from "../useBaseMutation";

export type useUpdateProjectBody = components["schemas"]["SuggestTechnologyRequest"];

const useAddTechnology = ({ options = {} }: UseMutationProps<unknown, unknown, useUpdateProjectBody>) => {
  return useBaseMutation<useUpdateProjectBody, unknown>({
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
