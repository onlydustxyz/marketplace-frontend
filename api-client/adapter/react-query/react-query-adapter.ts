"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

export const useReactQueryAdapter = (fetcher: FetchAdapter): FetchAdapter => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const { getImpersonateHeaders } = useImpersonation();

  fetcher.setAuthAdapter({ isAuthenticated, getAccessToken: getAccessTokenSilently, logout });
  fetcher.setImpersonationHeaders(getImpersonateHeaders());

  return fetcher;
};
