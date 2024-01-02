"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { BasePaginatedParams } from "../../type.actions";

interface FilterContextProps<PARAMS extends BasePaginatedParams = BasePaginatedParams> {
  children: ReactNode;
  getPage(params: PARAMS): Promise<JSX.Element>;
  pageSize: number;
  initialPage: JSX.Element;
}

type FilterContextReturn<PARAMS extends BasePaginatedParams = BasePaginatedParams> = {
  onChange(params: Partial<PARAMS>): Promise<JSX.Element>;
};

export const FilterContext = createContext<FilterContextReturn>({
  onChange: () => new Promise(resolve => resolve(<div></div>)),
});

export function FilterProviders({ children, getPage, pageSize, initialPage }: FilterContextProps) {
  const [currentParams, setCurrentParams] = useState<Partial<BasePaginatedParams>>({
    pageSize,
    pageIndex: 0,
  });

  const [page, setPage] = useState<JSX.Element | null>(null);

  const onChange = async (params: Partial<BasePaginatedParams>) => {
    const pageData = await getPage({
      ...currentParams,
      ...params,
      pageIndex: 0,
      pageSize,
    });

    setCurrentParams({ ...currentParams, ...params });

    setPage(pageData);

    return pageData;
  };

  return (
    <FilterContext.Provider
      value={{
        onChange,
      }}
    >
      {!page ? children : page}
      {initialPage}
    </FilterContext.Provider>
  );
}

export const useFilterContext = <PARAMS extends BasePaginatedParams = BasePaginatedParams>() => {
  return useContext(FilterContext) as FilterContextReturn<PARAMS>;
};
