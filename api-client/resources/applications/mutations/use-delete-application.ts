import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { deleteApplication } from "api-client/resources/applications/fetch";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { PROJECT_TAGS } from "src/api/Project/tags";

export function useDeleteApplication(
  { options, ...fetch }: ParametersInterfaceWithReactQuery<typeof deleteApplication>,
  projectId: string
) {
  const { mutation } = useReactQueryAdapter(deleteApplication(fetch), options);
  const queryClient = useQueryClient();

  return useMutation({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TAGS.good_first_issues(projectId),
        exact: false,
      });
    },
  });
}
