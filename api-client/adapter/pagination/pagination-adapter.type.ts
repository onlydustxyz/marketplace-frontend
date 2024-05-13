import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { PaginationInterface } from "api-client/config/pagination-interface";

export interface IPaginationAdapter<T> {
  fetcher: IFetchAdapater<T>;
  pagination?: PaginationInterface;
}
