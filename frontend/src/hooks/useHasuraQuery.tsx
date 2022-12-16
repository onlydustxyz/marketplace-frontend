import {
  QueryHookOptions,
  MutationHookOptions,
  TypedDocumentNode,
  useQuery,
  useMutation,
  QueryResult,
  useLazyQuery,
  OperationVariables,
  MutationTuple,
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

export function useLazyHasuraQuery<T = any>(
  query: TypedDocumentNode,
  role: HasuraUserRole,
  options: QueryHookOptions = {}
) {
  const [fetch, apolloQuery] = useLazyQuery(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
  return [fetch, apolloQuery] as [typeof fetch, QueryResult<T>];
}

export const useHasuraMutation = <T,>(
  query: TypedDocumentNode<T>,
  role: HasuraUserRole,
  options: MutationHookOptions<T> = {}
) => {
  return useMutation<T>(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
