import { API_PATH } from "src/api/ApiPath";
import { UseMutationProps, useBaseMutation } from "../useBaseMutation";
import { PROJECT_TAGS } from "../Project/tags";

const useAcceptProjectLeaderInvitation = ({
  options = {},
  params,
}: UseMutationProps<unknown, { projectId: string; projectSlug: string }, null>) => {
  return useBaseMutation<null, unknown>({
    resourcePath: API_PATH.ME_PROJECT_LEADER_INVITATIONS(params?.projectId || ""),
    enabled: !!params?.projectId,
    invalidatesTags: [{ queryKey: PROJECT_TAGS.detail_by_slug(params?.projectSlug || ""), exact: false }],
    ...options,
  });
};

export default { useAcceptProjectLeaderInvitation };
