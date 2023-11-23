import { API_PATH } from "src/api/ApiPath";
import { components } from "src/__generated/api";
import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { UseUploaderProps, useBaseUploader } from "../useBaseUploader";
import { PROJECT_TAGS } from "./tags";

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
export type useUpdateProjectResponse = components["schemas"]["UpdateProjectResponse"];

const useUpdateProject = ({
  params,
  options = {},
}: UseMutationProps<useUpdateProjectResponse, { projectId?: string; projectSlug: string }, useUpdateProjectBody>) => {
  return useBaseMutation<useUpdateProjectBody, useUpdateProjectResponse>({
    resourcePath: API_PATH.PROJECT_DETAILS(params?.projectId || ""),
    method: "PUT",
    enabled: !!params?.projectId,
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

export type UseIgnoreUnignoreContributionBody = components["schemas"]["UpdateProjectIgnoredContributionsRequest"];

const useIgnoreUnignoreContribution = ({
  params,
  options = {},
}: UseMutationProps<void, { projectId?: string }, UseIgnoreUnignoreContributionBody>) => {
  return useBaseMutation<UseIgnoreUnignoreContributionBody, void>({
    resourcePath: API_PATH.PROJECT_IGNORE_UNIGNORE_CONTRIBUTIONS(params?.projectId || ""),
    invalidatesTags: [{ queryKey: PROJECT_TAGS.rewardable_items(params?.projectId || ""), exact: false }],
    method: "PATCH",
    ...options,
  });
};

export type UseCreateOtherWorksBody = components["schemas"]["AddOtherWorkRequest"];
export type UseCreateOtherWorksResponse = components["schemas"]["RewardableItemResponse"];

const useCreateOtherWorks = ({
  params,
  options = {},
}: UseMutationProps<UseCreateOtherWorksResponse, { projectId?: string }, UseCreateOtherWorksBody>) => {
  return useBaseMutation<UseCreateOtherWorksBody, UseCreateOtherWorksResponse>({
    resourcePath: API_PATH.PROJECT_CREATE_OTHER_WORKS(params?.projectId || ""),
    invalidatesTags: [{ queryKey: PROJECT_TAGS.rewardable_items(params?.projectId || ""), exact: false }],
    method: "POST",
    ...options,
  });
};

export default {
  useCreateProject,
  useUpdateProject,
  useUploadLogo,
  useIgnoreUnignoreContribution,
  useCreateOtherWorks,
};
