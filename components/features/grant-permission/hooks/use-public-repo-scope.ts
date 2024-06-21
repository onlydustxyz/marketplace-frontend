import { useAuth0 } from "@auth0/auth0-react";
import { PopupConfigOptions, PopupLoginOptions } from "@auth0/auth0-spa-js";
import { meApiClient } from "api-client/resources/me";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

async function handleLoginWithPopup(
  loginWithPopup: (options?: PopupLoginOptions, config?: PopupConfigOptions) => Promise<void>
) {
  await loginWithPopup({
    authorizationParams: { connection_scope: process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE },
  });
}

export function usePublicRepoScope({
  onCreateSuccess,
  onUpdateSuccess,
}: {
  onCreateSuccess?: () => void;
  onUpdateSuccess?: () => void;
}) {
  const { loginWithPopup } = useAuth0();
  const hasLogout = useRef(false);
  const [scopeStorage, setScopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");
  const [hasAskedForPermission, setHasAskedForPermission] = useState<false | "update-permission" | "create-permission">(
    false
  );

  const isAuthFlowTerminated = useRef<false | "update-permission-terminated" | "create-permission-terminated">(false);

  const { mutate: logoutUser } = meApiClient.mutations.useLogoutUser({
    onSuccess: async () => {
      await handleLoginWithPopup(loginWithPopup).then(() => {
        isAuthFlowTerminated.current = "create-permission-terminated";
      });
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
        handleLoginWithPopup(loginWithPopup).then(() => {
          isAuthFlowTerminated.current = "update-permission-terminated";
        });
      }
    }
  }, [scopeStorage, canApply, hasAskedForPermission]);

  useEffect(() => {
    if (canApply) {
      if (isAuthFlowTerminated.current === "create-permission-terminated") {
        isAuthFlowTerminated.current = false;
        onCreateSuccess?.();
      }
      if (isAuthFlowTerminated.current === "update-permission-terminated") {
        isAuthFlowTerminated.current = false;
        onUpdateSuccess?.();
      }
    }
  }, [canApply]);

  function createAskForPermission() {
    if (!canApply) {
      return "create-permission";
    }

    if (canApply && !scopeStorage) {
      return "update-permission";
    }

    return false;
  }

  function handleAddPublicRepoScope() {
    if (process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
      setHasAskedForPermission(createAskForPermission());
    }
  }

  return { handleAddPublicRepoScope, scopeStorage, canApply };
}
