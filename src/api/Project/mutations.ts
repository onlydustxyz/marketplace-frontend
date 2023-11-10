import { API_PATH } from "src/api/ApiPath";
import { components } from "src/__generated/api";
import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { UseUploaderProps, useBaseUploader } from "../useBaseUploader";

export type UseCreateProjectBody = components["schemas"]["CreateProjectRequest"];
export type UseCreateProjectResponse = components["schemas"]["CreateProjectResponse"];

const useCreateProject = ({
  options = {},
}: UseMutationProps<UseCreateProjectResponse, undefined, UseCreateProjectBody>) => {
  return useBaseMutation<UseCreateProjectBody, UseCreateProjectResponse>({
    resourcePath: API_PATH.PROJECTS,
    method: "POST",
    ...options,
  });
};

export type useUpdateProjectBody = components["schemas"]["UpdateProjectRequest"];
export type useUpdateProjectResponse = components["schemas"]["UpdateProjectRequest"];

const useUpdateroject = ({
  params,
  options = {},
}: UseMutationProps<useUpdateProjectResponse, { projectKey?: string }, useUpdateProjectBody>) => {
  return useBaseMutation<useUpdateProjectBody, useUpdateProjectResponse>({
    resourcePath: API_PATH.PROJECT_DETAILS(params?.projectKey || ""),
    method: "PUT",
    enabled: !!params?.projectKey,
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

export default { useCreateProject, useUpdateroject, useUploadLogo };
