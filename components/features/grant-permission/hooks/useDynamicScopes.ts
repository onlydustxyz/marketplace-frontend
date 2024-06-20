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
  const [hasAskedForPermission, setHasAskedForPermission] = useState<false | "update-permission" | "create-permission">(
    false
  );

  const { mutate: logoutUser } = meApiClient.mutations.useLogoutUser({
    onSuccess: () => {
      handleLoginWithRedirect(loginWithRedirect, { grantPermissionFLowTriggered: "true" });
    },
  });

  const { user } = useCurrentUser();
  const canApply = user?.isAuthorizedToApplyOnGithubIssues;

  useEffect(() => {
    if (!hasLogout.current && hasAskedForPermission && scopeStorage) {
      hasLogout.current = true;
      if (hasAskedForPermission === "create-permission") {
        logoutUser({});
      }
      if (hasAskedForPermission === "update-permission") {
        handleLoginWithRedirect(loginWithRedirect, { grantPermissionFLowTriggered: "true" });
      }
    }
  }, [scopeStorage, canApply, hasAskedForPermission]);

  function createAskForPermission() {
    if (!canApply) {
      return "create-permission";
    }

    if (canApply && !scopeStorage) {
      return "update-permission";
    }

    return false;
  }

  function handleAddDynamicScopes() {
    if (process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
      setHasAskedForPermission(createAskForPermission());
    }
  }

  return { handleAddDynamicScopes, scopeStorage, canApply };
}
