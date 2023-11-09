import { API_PATH } from "src/api/ApiPath";
import { components } from "src/__generated/api";
import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { UseUploaderProps, useBaseUploader } from "../useBaseUploader";

export type useCreateProjectBody = components["schemas"]["CreateProjectRequest"];
export type useCreateProjectResponse = components["schemas"]["CreateProjectResponse"];

const useCreateProject = ({
  options = {},
}: UseMutationProps<useCreateProjectResponse, undefined, useCreateProjectBody>) => {
  return useBaseMutation<useCreateProjectBody, useCreateProjectResponse>({
    resourcePath: API_PATH.PROJECTS,
    method: "POST",
    ...options,
  });
};

const useUploadLogo = ({ options = {} }: UseUploaderProps<{ url: string }, undefined>) => {
  return useBaseUploader<{ url: string }>({
    resourcePath: API_PATH.PROJECTS_LOGO,
    method: "POST",
    ...options,
  });
};

export default { useCreateProject, useUploadLogo };
