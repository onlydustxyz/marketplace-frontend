import {
  QueryHookOptions,
  MutationHookOptions,
  TypedDocumentNode,
  useQuery,
  useMutation,
  QueryResult,
  LazyQueryResult,
  useLazyQuery,
  OperationVariables,
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

export const useHasuraMutation = (
  query: TypedDocumentNode,
  role: HasuraUserRole,
  options: MutationHookOptions = {}
) => {
  return useMutation(query, merge(options, { context: { headers: { "X-Hasura-Role": role } } }));
};
