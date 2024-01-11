import { RedirectLoginOptions } from "@auth0/auth0-react";

export async function handleLoginWithRedirect(
  loginWithRedirectFunc: (options?: RedirectLoginOptions) => Promise<void>
) {
  await loginWithRedirectFunc();
  //   {
  //   appState: {
  //     returnTo: window.location.pathname,
  //   },
  // }
}
