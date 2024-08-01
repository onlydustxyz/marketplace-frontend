import { meApiClient } from "api-client/resources/me";
import { Auth0ClientAdapter } from "core/application/auth0-client-adapter";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useMemo } from "react";
import { useLocalStorage } from "react-use";

import { TApplyIssueDrawer } from "components/features/apply-issue-drawer/apply-issue-drawer.types";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function usePublicRepoScope({
  onSuccessCallback,
}: {
  onSuccessCallback?: (actionType: TApplyIssueDrawer.ActionType) => void;
}) {
  const [scopeStorage, setScopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false, loginWithRedirect, loginWithPopup } = authProvider ?? {};

  const { user, refetch } = useCurrentUser();
  const canApply = useMemo(() => user?.isAuthorizedToApplyOnGithubIssues, [user]);

  const { mutateAsync: logoutUser } = meApiClient.mutations.useLogoutUser({});

  async function getPermissions() {
    if (!scopeStorage) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
    }
    await logoutUser({});
    if (loginWithPopup) await Auth0ClientAdapter.helpers.handleLoginWithPopup(loginWithPopup);
    await refetch();
  }

  async function handleVerifyPermissions(actionType: TApplyIssueDrawer.ActionType) {
    if (!isAuthenticated) {
      if (loginWithRedirect) Auth0ClientAdapter.helpers.handleLoginWithRedirect(loginWithRedirect);
      return;
    }

    if (!canApply) {
      await getPermissions();
      onSuccessCallback?.(actionType);
      return;
    }
    onSuccessCallback?.(actionType);
  }

  return { handleVerifyPermissions, getPermissions, canApply };
}
