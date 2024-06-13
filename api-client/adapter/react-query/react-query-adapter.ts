"use client";

import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { useReactQueryAuthAdapter } from "api-client/adapter/react-query-auth/react-query-auth-adapter";
import { ReactQueryOptions } from "api-client/types/react-query-options";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

interface IuseReactQueryAdapter<T> {
  fetcher: IFetchAdapater<T>;
  query: {
    queryKey: (string | boolean)[];
    queryFn: () => Promise<T>;
  };
  mutation: {
    mutationFn: (variables?: Record<string, unknown>) => Promise<T>;
  };
}
export const useReactQueryAdapter = <T>(
  fetchAdapter: IFetchAdapater<T>,
  options?: ReactQueryOptions
): IuseReactQueryAdapter<T> => {
  const { fetcher } = useReactQueryAuthAdapter(fetchAdapter);
  const { isImpersonating } = useImpersonation();

  const query = {
    queryKey: [fetcher.tag ?? "", isImpersonating],
    queryFn: () => fetcher.request(),
    ...options,
  };

  const mutation = {
    mutationFn: (body?: Record<string, unknown>) => {
      if (body) {
        fetcher.setBody(JSON.stringify(body));
      }
      return fetcher.request();
    },
  };

  return {
    fetcher,
    query,
    mutation,
  };
};
