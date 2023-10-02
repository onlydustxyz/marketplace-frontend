import { setContext } from "@apollo/client/link/context";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";

export default function useAuthenticationLink() {
  const { getImpersonationHeaders } = useImpersonationClaims();
  const { tokenSet } = useTokenSet();

  return setContext((_, { headers }) => {
    const authorizationHeader = tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet?.accessToken}` } : {};
    return {
      headers: {
        ...authorizationHeader,
        ...getImpersonationHeaders(),
        ...headers,
      },
    };
  });
}
