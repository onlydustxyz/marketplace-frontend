import { useAuth0 } from "@auth0/auth0-react";
import process from "process";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

export function useDynamicScopes() {
  const [scopeStorage, setScopesStorage] = useLocalStorage("dynamic-github-public-repo-scope");
  const { loginWithRedirect } = useAuth0();

  // const { user } = useCurrentUser();
  // const canApply = user?.isAuthorizedToApplyOnGithubIssues;
  const canApply = true;

  useEffect(() => {
    if (scopeStorage && !canApply) {
      handleLoginWithRedirect(loginWithRedirect);
    }
  }, [scopeStorage]);

  function handleAddDynamicScopes() {
    setScopesStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
  }

  return { handleAddDynamicScopes, scopeStorage, canApply };
}
