import {
  QueryHookOptions,
  TypedDocumentNode,
  useQuery,
  QueryResult,
  OperationVariables,
  useSuspenseQuery_experimental,
  UseSuspenseQueryResult,
  SuspenseQueryHookOptions,
} from "@apollo/client";
import merge from "lodash/merge";
import { HasuraUserRole } from "src/types";

export const useCachableHasuraQuery = <T, V = OperationVariables>(
  query: TypedDocumentNode<T, V>,
  role: HasuraUserRole,
  options: QueryHookOptions<T, V> = {}
): QueryResult<T, V> => {
  return useQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role, "X-Cache-Api": 1 } } }));
};

export const useCachableHasuraSuspensedQuery = <T, V extends OperationVariables = OperationVariables>(
  query: TypedDocumentNode<T, V>,
  role: HasuraUserRole,
  options: SuspenseQueryHookOptions<T, V> = {}
): UseSuspenseQueryResult<T, V> => {
  return useSuspenseQuery_experimental(
    query,
    merge(options, { context: { headers: { "X-Hasura-Role": role, "X-Cache-Api": 1 } } })
  );
};
