import { useAuth0 } from "@auth0/auth0-react";
import { PopupConfigOptions, PopupLoginOptions } from "@auth0/auth0-spa-js";
import { meApiClient } from "api-client/resources/me";

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
  // 1- Check if user can apply

  // 2- if false :
  //  a - logout
  //  b - handleLoginWithPopup and pass the public_repo scope
  //  c - check if can apply and then do step (3)

  // 3 - if true : Open drawer

  const { loginWithPopup, isAuthenticated, loginWithRedirect } = useAuth0();
  const { user } = useCurrentUser();
  const canApply = user?.isAuthorizedToApplyOnGithubIssues;

  const { mutateAsync: logoutUser } = meApiClient.mutations.useLogoutUser({});

  async function getPermissions() {
    await logoutUser({});
    await handleLoginWithPopup(loginWithPopup);
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
