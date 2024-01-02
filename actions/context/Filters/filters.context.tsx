// children -> initial children
// getPage -> server action to get page
//

// import { createContext } from "react";

// export const FiltersApiContext = createContext();
"use client";
import { createContext, ReactNode, useState } from "react";
import { BasePaginatedParams } from "../../type.actions";

interface FilterContextProps<PARAMS extends BasePaginatedParams = BasePaginatedParams> {
  children: ReactNode;
  getPage(params: PARAMS): Promise<JSX.Element>;
}

type FilterContextReturn<PARAMS extends BasePaginatedParams = BasePaginatedParams> = {
  onChange(params: PARAMS): Promise<JSX.Element>;
};

export const FilterContext = createContext<FilterContextReturn>({
  onChange: () => new Promise(resolve => resolve(<div></div>)),
});

export function FilterProviders({ children, getPage }: FilterContextProps) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [page, setPage] = useState<JSX.Element | null>(null);

  const onChange = async (params: BasePaginatedParams) => {
    const pageData = await getPage({
      ...params,
      pageIndex: 0,
    });

    setIsFiltered(true);
    setPage(pageData);

    return pageData;
  };

  return (
    <FilterContext.Provider
      value={{
        onChange,
      }}
    >
      {!isFiltered ? children : page}
    </FilterContext.Provider>
  );
}
