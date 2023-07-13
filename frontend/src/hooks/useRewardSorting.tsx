import { sortBy } from "lodash";
import { useCallback, useState } from "react";
import { Sortable } from "src/types";

export enum Field {
  Date,
  RewardId,
  Amount,
  Status,
}

export type Sorting = {
  field: Field;
  ascending: boolean;
};

export type SortingFields = {
  [Field.Date]: Date;
  [Field.RewardId]: string;
  [Field.Amount]: number;
  [Field.Status]: number;
};

export default function useRewardSorting(): {
  sort: <T extends Sortable>(sortables: T[]) => T[];
  sorting: Sorting;
  applySorting: (field: Field, ascending: boolean) => void;
} {
  const [sorting, setSorting] = useState({ field: Field.Date, ascending: false });

  const applySorting = useCallback(
    (field: Field, ascending: boolean) =>
      setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : ascending }),
    [sorting]
  );

  const sort = useCallback(
    <T extends Sortable>(rewards: T[]) => {
      const sorted = sortBy(rewards, p => p.sortingFields?.[sorting.field]);
      return sorting.ascending ? sorted : sorted.reverse();
    },
    [sorting]
  );

  return { sort, sorting, applySorting };
}
