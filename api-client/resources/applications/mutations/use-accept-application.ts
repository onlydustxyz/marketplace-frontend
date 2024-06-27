import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { acceptApplication } from "api-client/resources/applications/fetch/accept-application";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";
import { useRouter } from "next/navigation";

import { PROJECT_TAGS } from "src/api/Project/tags";

import { NEXT_ROUTER } from "constants/router";

export function useAcceptApplication(
  { options, ...fetch }: ParametersInterfaceWithReactQuery<typeof acceptApplication>,
  projectId: string,
  projectSlug: string
) {
  const router = useRouter();
  const { mutation } = useReactQueryAdapter(acceptApplication(fetch), options);
  const queryClient = useQueryClient();

  return useMutation({
    ...mutation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TAGS.good_first_issues(projectId),
        exact: false,
      });
      router.push(NEXT_ROUTER.projects.details.root(projectSlug));
    },
  });
}
