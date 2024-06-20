import { useAuth0 } from "@auth0/auth0-react";
import { meApiClient } from "api-client/resources/me";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useDynamicScopes() {
  const { loginWithRedirect } = useAuth0();
  const hasLogout = useRef(false);
  const [scopeStorage, setScopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");
  const [hasAskedForPermission, setHasAskedForPermission] = useState(false);

  const { mutate: logoutUser } = meApiClient.mutations.useLogoutUser({
    onSuccess: () => {
      handleLoginWithRedirect(loginWithRedirect, { grantPermissionFLowTriggered: "true" });
    },
  });

  const { user } = useCurrentUser();
  const canApply = user?.isAuthorizedToApplyOnGithubIssues;
  // const canApply = false;

  useEffect(() => {
    if (hasAskedForPermission) {
      if (scopeStorage && !canApply) {
        if (!hasLogout.current) {
          hasLogout.current = true;
          logoutUser({});
        }
      }
      if (!scopeStorage && canApply) {
        handleLoginWithRedirect(loginWithRedirect, { grantPermissionFLowTriggered: "true" });
      }
    }
  }, [scopeStorage, canApply, hasAskedForPermission]);

  function handleAddDynamicScopes() {
    if (process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
      setHasAskedForPermission(true);
    }
  }

  return { handleAddDynamicScopes, scopeStorage, canApply };
}
