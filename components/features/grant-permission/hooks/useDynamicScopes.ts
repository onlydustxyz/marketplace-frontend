import { useAuth0 } from "@auth0/auth0-react";
import process from "process";
import { useEffect } from "react";

// import { useLocalStorage } from "react-use";
import { useLocalStorage } from "src/hooks/useStorage/useStorage";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

export function useDynamicScopes() {
  const scopeStorage = useLocalStorage<string>({
    key: "dynamic-github-public-repo-scope",
    initialValue: "",
  });

  const { loginWithRedirect } = useAuth0();

  // const { user } = useCurrentUser();
  // const canApply = user?.isAuthorizedToApplyOnGithubIssues;
  const canApply = true;

  useEffect(() => {
    if (scopeStorage.getValue() && !canApply) {
      handleLoginWithRedirect(loginWithRedirect, { grantPermissionFLowTriggered: "true" });
    }
  }, [scopeStorage.getValue(), canApply]);

  function handleAddDynamicScopes() {
    if (process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE) {
      scopeStorage.setValue(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
    }
  }

  return { handleAddDynamicScopes, scopeStorage, canApply };
}
