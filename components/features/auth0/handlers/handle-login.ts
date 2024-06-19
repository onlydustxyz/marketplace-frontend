import { RedirectLoginOptions } from "@auth0/auth0-react";

export async function handleLoginWithRedirect(
  loginWithRedirectFunc: (options?: RedirectLoginOptions) => Promise<void>,
  queryParam?: { [key: string]: string }
) {
  await loginWithRedirectFunc({
    appState: {
      returnTo: `${window.location.pathname}${queryParam ? `?${new URLSearchParams(queryParam).toString()}` : ""}`,
    },
  });
}
