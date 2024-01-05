import { RedirectLoginOptions } from "@auth0/auth0-react";

export const handleLoginWithRedirect = async (
  loginWithRedirectFunc: (options?: RedirectLoginOptions) => Promise<void>
) => {
  await loginWithRedirectFunc({
    appState: {
      returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || "/",
    },
  });
};
