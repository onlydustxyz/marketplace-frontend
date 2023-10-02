import { ApolloLink } from "@apollo/client";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import useErrorLink from "./error";
import useRetryLink from "./retry";
import useAuthenticationLink from "./authentication";
import useTokenRefreshLink from "./token";
import useHttpLink from "./http";

export default function useApolloLink() {
  const { impersonationSet } = useImpersonationClaims();

  const errorLink = useErrorLink();
  const retryLink = useRetryLink();
  const authenticationLink = useAuthenticationLink();
  const tokenRefreshLink = useTokenRefreshLink();
  const httpLink = useHttpLink();

  return ApolloLink.from([
    errorLink,
    retryLink,
    ...(impersonationSet ? [authenticationLink] : [authenticationLink, tokenRefreshLink]),
    httpLink,
  ]);
}
