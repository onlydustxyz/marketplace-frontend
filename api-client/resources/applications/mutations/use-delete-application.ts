import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { deleteApplication } from "api-client/resources/applications/fetch";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

export function useDeleteApplication({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof deleteApplication>) {
  const { mutation } = useReactQueryAdapter(deleteApplication(fetch), options);
  const queryClient = useQueryClient();

  return useMutation({
    ...mutation,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
