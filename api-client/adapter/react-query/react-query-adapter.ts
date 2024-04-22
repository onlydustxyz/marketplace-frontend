"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

export const useReactQueryAdapter = (fetcher: FetchAdapter): FetchAdapter => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();

  fetcher.setAuthAdapter({ isAuthenticated, getAccessToken: getAccessTokenSilently, logout });
  fetcher.impersonationHeaders = getImpersonateHeaders();

  return fetcher;
};

// const mutation = useMutation({
//   mutationFn: postTodo,
//   onSuccess: () => {
//     // Invalidate and refetch
//     queryClient.invalidateQueries({ queryKey: ['todos'] })
//   },
// })
// useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
// const { data } = useQuery({
//   queryKey: ['posts'],
//   queryFn: getPosts,
//   initialData: props.posts,
// })
// const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//   useInfiniteQuery(
//     'projects',
//     ({ pageParam = 0 }) => fetchProjects(pageParam),
//     {
//       getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
//     },
//   )
