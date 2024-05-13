import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { IPaginationAdapter } from "api-client/adapter/pagination/pagination-adapter.type";
import { PaginationInterface } from "api-client/config/pagination-interface";

export function PaginationAdapter<T>(
  fetchAdapter: IFetchAdapater<T>,
  pagination?: PaginationInterface
): IPaginationAdapter<T> {
  const pageIndex = pagination?.pageIndex || 0;
  const pageSize = pagination?.pageSize || 15;

  const fetcher = fetchAdapter
    .setParams({ pageIndex: pageIndex.toString() })
    .setParams({ pageSize: pageSize.toString() });

  return {
    fetcher,
  };
}
