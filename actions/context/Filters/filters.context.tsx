"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { BasePaginatedParams } from "../../type.actions";

interface FilterContextProps<PARAMS extends BasePaginatedParams = BasePaginatedParams> {
  children: ReactNode;
  getPage(params: PARAMS): Promise<JSX.Element>;
  pageSize: number;
}

type FilterContextReturn<PARAMS extends BasePaginatedParams = BasePaginatedParams> = {
  onChange(params: Partial<PARAMS>): Promise<JSX.Element>;
  filteredChildren: JSX.Element | null;
};

export const FilterContext = createContext<FilterContextReturn>({
  onChange: () => new Promise(resolve => resolve(<div></div>)),
  filteredChildren: null,
});

export function FilterProviders({ children, getPage, pageSize }: FilterContextProps) {
  const [currentParams, setCurrentParams] = useState<Partial<BasePaginatedParams>>({
    pageSize,
    pageIndex: 0,
  });

  const [page, setPage] = useState<JSX.Element | null>(null);

  const onChange = async (params: Partial<BasePaginatedParams>) => {
    const filteredData = await getPage({
      ...currentParams,
      ...params,
      pageIndex: 0,
      pageSize,
    });

    setCurrentParams({ ...currentParams, ...params });

    setPage(filteredData);

    return filteredData;
  };

  return (
    <FilterContext.Provider
      value={{
        onChange,
        filteredChildren: page,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = <PARAMS extends BasePaginatedParams = BasePaginatedParams>() => {
  return useContext(FilterContext) as FilterContextReturn<PARAMS>;
};
