import { useMemo, useState } from "react";
import { QueryParam } from "src/utils/getEndpointUrl";

export default function useQueryParamsSorting({ field, isAscending }: { field?: string; isAscending?: boolean }) {
  const [sorting, setSorting] = useState({ field, isAscending });
  const sortField = (field: string) =>
    setSorting({ field, isAscending: sorting.isAscending ? !sorting.isAscending : true });

  const queryParams = useMemo(
    () => [
      ...(sorting
        ? [
            { key: "sort", value: [sorting.field] },
            { key: "direction", value: [sorting.isAscending ? "ASC" : "DESC"] },
          ]
        : []),
    ],
    [sorting]
  ) as QueryParam[];

  return { sorting, sortField, queryParams };
}
