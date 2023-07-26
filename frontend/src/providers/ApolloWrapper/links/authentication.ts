import { setContext } from "@apollo/client/link/context";
import { useTokenSet } from "src/hooks/useTokenSet";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";

export default function useAuthenticationLink() {
  const { impersonationSet, customClaims } = useImpersonationClaims();
  const { tokenSet } = useTokenSet();

  return setContext((_, { headers }) => {
    const authorizationHeaders = tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet?.accessToken}` } : {};
    const impersonationClaims = impersonationSet
      ? {
          "x-hasura-user-id": impersonationSet.userId,
          "x-hasura-projectsLeaded": `{${customClaims.projectsLeaded?.map(id => `"${id}"`).join(",") || ""}}`,
          "x-hasura-githubUserId": `${customClaims.githubUserId || 0}`,
        }
      : undefined;
    const impersonationHeaders =
      impersonationSet && impersonationClaims
        ? {
            // Impersonation for Hasura
            "X-Hasura-Admin-Secret": impersonationSet.password,
            "X-Hasura-Role": "registered_user",
            "X-Hasura-User-Id": impersonationClaims["x-hasura-user-id"],
            "X-Hasura-projectsLeaded": impersonationClaims["x-hasura-projectsLeaded"],
            "X-Hasura-githubUserId": impersonationClaims["x-hasura-githubUserId"],
            // Impersonation for OnlyDust API
            "X-Impersonation-Secret": impersonationSet.password,
            "X-Impersonation-Claims": JSON.stringify(impersonationClaims),
          }
        : {};
    return {
      headers: {
        ...authorizationHeaders,
        ...impersonationHeaders,
        ...headers,
      },
    };
  });
}
