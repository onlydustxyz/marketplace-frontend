import { useMemo } from "react";
import { QueryParams } from "src/utils/getEndpointUrl";
import { useLocalStorage } from "usehooks-ts";

type Props<Field> = {
  storageKey: string;
} & Sorting<Field>;

export type Sorting<Field> = {
  field: Field;
  isAscending: boolean;
};

export type SortField<Field> = (field: Field) => void;

/*
Ascending order means the smallest or first or earliest in the order will appear at the top of the list:
For numbers or amounts, the sort is smallest to largest.
Lower numbers or amounts will be at the top of the list.
For letters/words, the sort is alphabetical from A to Z.
When it comes to dates, ascending order would mean that the oldest ones come first and the most recent ones last
*/
export default function useQueryParamsSorting<Field>({ field, isAscending, storageKey }: Props<Field>) {
  const [sorting, setSorting] = useLocalStorage(storageKey, { field, isAscending });

  const sortField: SortField<Field> = field =>
    setSorting({ field, isAscending: sorting.isAscending ? !sorting.isAscending : true });

  const queryParams = useMemo(
    () => ({
      sort: sorting.field,
      direction: sorting.isAscending ? "ASC" : "DESC",
    }),
    [sorting]
  ) as QueryParams;

  return { sorting, sortField, queryParams };
}
