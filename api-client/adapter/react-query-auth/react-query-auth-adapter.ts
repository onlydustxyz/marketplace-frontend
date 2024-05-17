"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

interface IuseReactQueryAdapter<T> {
  fetcher: IFetchAdapater<T>;
}
export const useReactQueryAuthAdapter = <T>(fetchAdapter: IFetchAdapater<T>): IuseReactQueryAdapter<T> => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();
  const fetcher = fetchAdapter
    .setAuthAdapter({ isAuthenticated, getAccessToken: getAccessTokenSilently, logout })
    .setImpersonationHeaders(getImpersonateHeaders());

  return {
    fetcher,
  };
};
