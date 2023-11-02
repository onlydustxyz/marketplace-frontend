import { useMemo } from "react";
import { QueryParams } from "src/utils/getEndpointUrl";
import { useLocalStorage } from "usehooks-ts";

export type Sorting<Field> = {
  field: Field;
  isAscending: boolean;
  storageKey: string;
};

export type SortField<Field> = (field: Field) => void;

/*
Ascending order means the smallest or first or earliest in the order will appear at the top of the list:
For numbers or amounts, the sort is smallest to largest.
Lower numbers or amounts will be at the top of the list.
For letters/words, the sort is alphabetical from A to Z.
When it comes to dates, ascending order would mean that the oldest ones come first and the most recent ones last
*/
export default function useQueryParamsSorting<Field>({ field, isAscending, storageKey }: Sorting<Field>) {
  const [sorting, setSorting] = useLocalStorage(storageKey, { field, isAscending });

  const sortField: SortField<Field> = field =>
    setSorting({ field, isAscending: sorting.isAscending ? !sorting.isAscending : true });

  //   const queryParams = useMemo(
  //     () => [
  //       ...(sorting
  //         ? [
  //             { key: "sort", value: [sorting.field] },
  //             { key: "direction", value: [sorting.isAscending ? "ASC" : "DESC"] },
  //           ]
  //         : []),
  //     ],
  //     [sorting]
  //   ) as QueryParams[];

  const queryParams = useMemo(
    () => ({
      // TODO remove arrays ?
      sort: [sorting.field],
      direction: [sorting.isAscending ? "ASC" : "DESC"],
    }),
    [sorting]
  ) as QueryParams;

  return { sorting, sortField, queryParams };
}
