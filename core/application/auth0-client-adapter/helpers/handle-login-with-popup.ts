import { PopupConfigOptions, PopupLoginOptions } from "@auth0/auth0-spa-js";

export async function handleLoginWithPopup(
  loginWithPopup: (options?: PopupLoginOptions, config?: PopupConfigOptions) => Promise<void>
) {
  return loginWithPopup({
    authorizationParams: { connection_scope: process.env.NEXT_PUBLIC_GITHUB_PUBLIC_REPO_SCOPE },
  });
}
