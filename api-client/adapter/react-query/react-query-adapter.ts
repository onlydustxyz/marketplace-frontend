"use client";

import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { useReactQueryAuthAdapter } from "api-client/adapter/react-query-auth/react-query-auth-adapter";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

interface IuseReactQueryAdapter<T> {
  fetcher: IFetchAdapater<T>;
  query: {
    queryKey: (string | boolean)[];
    queryFn: () => Promise<T>;
  };
  mutation: {
    mutationFn: () => Promise<T>;
  };
}
export const useReactQueryAdapter = <T>(fetchAdapter: IFetchAdapater<T>): IuseReactQueryAdapter<T> => {
  const { fetcher } = useReactQueryAuthAdapter(fetchAdapter);
  const { isImpersonating } = useImpersonation();

  const query = {
    queryKey: [...(fetcher.tag || []), isImpersonating],
    queryFn: () => fetcher.request(),
  };

  const mutation = {
    mutationFn: () => fetcher.request(),
  };

  return {
    fetcher,
    query,
    mutation,
  };
};
