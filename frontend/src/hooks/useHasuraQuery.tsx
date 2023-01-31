import {
  QueryHookOptions,
  MutationHookOptions,
  TypedDocumentNode,
  useQuery,
  useMutation,
  QueryResult,
  OperationVariables,
  useLazyQuery,
  LazyQueryResultTuple,
} from "@apollo/client";
import merge from "lodash/merge";
import { HasuraUserRole } from "src/types";

export const useHasuraQuery = <T, V = OperationVariables>(
  query: TypedDocumentNode<T, V>,
  role: HasuraUserRole,
  options: QueryHookOptions<T, V> = {}
): QueryResult<T, V> => {
  return useQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};

export const useHasuraLazyQuery = <T, V = OperationVariables>(
  query: TypedDocumentNode<T, V>,
  role: HasuraUserRole,
  options: QueryHookOptions<T, V> = {}
): LazyQueryResultTuple<T, V> => {
  return useLazyQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};

export const useHasuraMutation = <T,>(
  query: TypedDocumentNode<T>,
  role: HasuraUserRole,
  options: MutationHookOptions<T> = {}
) => {
  return useMutation<T>(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
