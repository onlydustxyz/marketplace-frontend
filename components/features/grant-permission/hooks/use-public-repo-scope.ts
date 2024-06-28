import { useAuth0 } from "@auth0/auth0-react";
import { PopupConfigOptions, PopupLoginOptions } from "@auth0/auth0-spa-js";
import { meApiClient } from "api-client/resources/me";
import { useLocalStorage } from "react-use";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

async function handleLoginWithPopup(
  loginWithPopup: (options?: PopupLoginOptions, config?: PopupConfigOptions) => Promise<void>
) {
  return loginWithPopup({
    authorizationParams: { connection_scope: process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE },
  });
}

export function usePublicRepoScope({ onSuccessCallback }: { onSuccessCallback?: () => void }) {
  const [scopeStorage, setScopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");
  const { loginWithPopup, isAuthenticated, loginWithRedirect } = useAuth0();
  const { user, refetch } = useCurrentUser();
  const canApply = user?.isAuthorizedToApplyOnGithubIssues;

  const { mutateAsync: logoutUser } = meApiClient.mutations.useLogoutUser({});

  async function getPermissions() {
    if (!scopeStorage) {
      setScopeStorage(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE);
    }
    await logoutUser({});
    await handleLoginWithPopup(loginWithPopup);
    await refetch();
  }

  async function handleVerifyPermissions() {
    if (!isAuthenticated) {
      await handleLoginWithRedirect(loginWithRedirect);
      return;
    }

    if (!canApply) {
      await getPermissions();
      onSuccessCallback?.();
      return;
    }
    onSuccessCallback?.();
  }

  return { handleVerifyPermissions, getPermissions, canApply };
}
