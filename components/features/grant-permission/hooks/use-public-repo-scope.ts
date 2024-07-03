import { useAuth0 } from "@auth0/auth0-react";
import { PopupConfigOptions, PopupLoginOptions } from "@auth0/auth0-spa-js";
import { meApiClient } from "api-client/resources/me";
import { useMemo } from "react";
import { useLocalStorage } from "react-use";

import { TApplyIssueDrawer } from "app/p/[slug]/features/apply-issue-drawer/apply-issue-drawer.types";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

async function handleLoginWithPopup(
  loginWithPopup: (options?: PopupLoginOptions, config?: PopupConfigOptions) => Promise<void>
) {
  return loginWithPopup({
    authorizationParams: { connection_scope: process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE },
  });
}

export function usePublicRepoScope({
  onSuccessCallback,
}: {
  onSuccessCallback?: (actionType: TApplyIssueDrawer.ActionType) => void;
}) {
  const [scopeStorage, setScopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");
  const { loginWithPopup, isAuthenticated, loginWithRedirect } = useAuth0();
  const { user, refetch } = useCurrentUser();
  const canApply = useMemo(() => user?.isAuthorizedToApplyOnGithubIssues, [user]);

  const { mutateAsync: logoutUser } = meApiClient.mutations.useLogoutUser({});

  async function getPermissions() {
    if (!scopeStorage) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
    }
    await logoutUser({});
    await handleLoginWithPopup(loginWithPopup);
    await refetch();
  }

  async function handleVerifyPermissions(actionType: TApplyIssueDrawer.ActionType) {
    if (!isAuthenticated) {
      await handleLoginWithRedirect(loginWithRedirect);
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
