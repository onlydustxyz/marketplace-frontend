"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { IFetchAdapater } from "api-client/adapter/fetch/fetch-adapter.types";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

export const useReactQueryAdapter = <T>(fetchAdapter: IFetchAdapater<T>): IFetchAdapater<T> => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();

  return fetchAdapter
    .setAuthAdapter({ isAuthenticated, getAccessToken: getAccessTokenSilently, logout })
    .setImpersonationHeaders(getImpersonateHeaders());
};
