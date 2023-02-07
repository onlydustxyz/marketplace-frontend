import { sortBy } from "lodash";
import { useCallback, useState } from "react";
import { Sortable } from "src/types";

export enum Field {
  Date,
  Contribution,
  Amount,
  Status,
}

export type Sorting = {
  field: Field;
  ascending: boolean;
};

export type SortingFields = {
  [Field.Date]: Date;
  [Field.Contribution]: string;
  [Field.Amount]: number;
  [Field.Status]: number;
};

export default function usePaymentSorting(): {
  sort: <T extends Sortable>(sortables: T[]) => T[];
  sorting: Sorting;
  applySorting: (field: Field) => void;
} {
  const [sorting, setSorting] = useState({ field: Field.Date, ascending: false });

  const applySorting = useCallback(
    (field: Field) => setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : true }),
    [sorting]
  );

  const sort = useCallback(
    <T extends Sortable>(payments: T[]) => {
      const sorted = sortBy(payments, p => p.sortingFields?.[sorting.field]);
      return sorting.ascending ? sorted : sorted.reverse();
    },
    [sorting]
  );

  return { sort, sorting, applySorting };
}
