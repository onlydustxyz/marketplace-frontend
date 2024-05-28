import { InvalidateOptions, InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  async function invalidateQuery(
    tag: string,
    filters: Omit<InvalidateQueryFilters, "queryKey"> = {},
    options?: InvalidateOptions
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
