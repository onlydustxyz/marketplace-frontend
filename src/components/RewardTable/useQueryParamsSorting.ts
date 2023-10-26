import { useMemo, useState } from "react";

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
  );

  return { sorting, sortField, queryParams };
}
