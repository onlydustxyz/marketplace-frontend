import { API_PATH } from "src/api/ApiPath";
import { components } from "src/__generated/api";
import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { PROJECT_TAGS } from "../Project/tags";

export type useCreateProjectBody = components["schemas"]["CreateProjectRequest"];
export type useCreateProjectResponse = components["schemas"]["CreateProjectResponse"];

const useAcceptProjectLeaderInvitation = ({
  options = {},
  params,
}: UseMutationProps<unknown, { projectId: string; projectSlug: string }, undefined>) => {
  return useBaseMutation<undefined, unknown>({
    resourcePath: API_PATH.ME_PROJECT_LEADER_INVITATIONS(params?.projectId || ""),
    method: "PUT",
    enabled: !!params?.projectId,
    invalidatesTags: [{ queryKey: PROJECT_TAGS.detail_by_slug(params?.projectSlug || ""), exact: false }],
    ...options,
  });
};

export default { useAcceptProjectLeaderInvitation };
