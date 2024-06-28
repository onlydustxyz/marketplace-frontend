import { PaginationInterface } from "api-client/config/pagination-interface";
import { FunctionTypes } from "api-client/types/function-types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export interface ParametersInterface<T extends { QueryParams?: unknown; PathParams?: unknown }> {
  queryParams?: T["QueryParams"];
  pathParams?: T["PathParams"];
  pagination?: PaginationInterface;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParametersInterfaceWithReactQuery<T extends (...args: any) => any> = FunctionTypes<T> & {
  options?: ReactQueryOptions;
};
