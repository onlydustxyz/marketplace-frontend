import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  async function invalidateQuery(
    tag: string,
    filters: Omit<Parameters<typeof queryClient.invalidateQueries>[0], "queryKey"> = {},
    options?: Parameters<typeof queryClient.invalidateQueries>[1]
  ) {
    return await queryClient.invalidateQueries(
      {
        queryKey: [tag],
        exact: false,
        ...filters,
      },
      options
    );
  }

  return { invalidateQuery };
}
