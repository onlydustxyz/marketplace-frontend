import { UseQueryProps } from "src/api/useBaseQuery";
import { API_PATH } from "src/api/ApiPath";
import { components } from "src/__generated/api";
import { useBaseMutation } from "../useBaseMutation";

export type useCreateProjectBody = components["schemas"]["CreateProjectRequest"];
export type useCreateProjectResponse = components["schemas"]["CreateProjectResponse"];

const useCreateProject = ({
  params,
  options,
}: UseQueryProps<useCreateProjectResponse, undefined, useCreateProjectBody>) => {
  return useBaseMutation<useCreateProjectBody, useCreateProjectResponse>({
    resourcePath: API_PATH.PROJECTS,
    pathParam: params,
    method: "POST",
    ...(options || {}),
  });
};

export default { useCreateProject };
