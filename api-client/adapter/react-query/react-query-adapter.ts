"use client";

import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";
import { useReactQueryAuthAdapter } from "api-client/adapter/react-query-auth/react-query-auth-adapter";

interface IuseReactQueryAdapter<T> {
  fetcher: IFetchAdapater<T>;
  query: {
    queryKey: string[];
    queryFn: () => Promise<T>;
  };
  mutation: {
    mutationFn: () => Promise<T>;
  };
}
export const useReactQueryAdapter = <T>(fetchAdapter: IFetchAdapater<T>): IuseReactQueryAdapter<T> => {
  const { fetcher } = useReactQueryAuthAdapter(fetchAdapter);

  const query = {
    queryKey: fetcher.tag ? [fetcher.tag] : [],
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
