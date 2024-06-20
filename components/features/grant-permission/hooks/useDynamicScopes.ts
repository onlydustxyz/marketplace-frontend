import { useAuth0 } from "@auth0/auth0-react";
import { meApiClient } from "api-client/resources/me";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useDynamicScopes() {
  const { loginWithRedirect } = useAuth0();
  const [scopeStorage, setScopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");

  const { mutate: logoutUser } = meApiClient.mutations.useLogoutUser({
    onSuccess: () => {
      handleLoginWithRedirect(loginWithRedirect, { grantPermissionFLowTriggered: "true" });
    },
  });

  const { user } = useCurrentUser();
  const canApply = user?.isAuthorizedToApplyOnGithubIssues;

  useEffect(() => {
    if (scopeStorage && !canApply) {
      logoutUser({});
    }
  }, [scopeStorage, canApply]);

  function handleAddDynamicScopes() {
    if (process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
    }
  }

  return { handleAddDynamicScopes, scopeStorage, canApply };
}
