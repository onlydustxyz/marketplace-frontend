import { setContext } from "@apollo/client/link/context";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";

export default function useAuthenticationLink() {
  const { impersonationSet, customClaims } = useImpersonationClaims();
  const { tokenSet } = useTokenSet();

  return setContext((_, { headers }) => {
    const authorizationHeaders = tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet?.accessToken}` } : {};
    const impersonationHeaders = impersonationSet
      ? {
          "X-Hasura-Admin-Secret": impersonationSet.password,
          "X-Hasura-User-Id": impersonationSet.userId,
          "X-Hasura-projectsLeaded": `{${customClaims.projectsLeaded?.map(id => `"${id}"`).join(",")}}`,
          "X-Hasura-githubUserId": customClaims.githubUserId,
        }
      : {};
    return {
      headers: {
        ...headers,
        ...authorizationHeaders,
        ...impersonationHeaders,
      },
    };
  });
}
