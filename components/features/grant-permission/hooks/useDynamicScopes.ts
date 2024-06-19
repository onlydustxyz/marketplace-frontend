import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

export function useDynamicScopes() {
  const [scopeStorage, setScopesStorage] = useLocalStorage("auth0-scope");
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
    setScopesStorage("public_repo read:org read:user");
  }

  return { handleAddDynamicScopes, scopeStorage, canApply };
}
