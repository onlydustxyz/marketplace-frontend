import { RedirectLoginOptions } from "@auth0/auth0-react";

export async function handleLoginWithRedirect(
  loginWithRedirectFunc: (options?: RedirectLoginOptions) => Promise<void>,
  options?: { queryParam?: { [key: string]: string }; connection_scope?: string }
) {
  await loginWithRedirectFunc({
    appState: {
      returnTo: `${window.location.pathname}${
        options?.queryParam ? `?${new URLSearchParams(options.queryParam).toString()}` : ""
      }`,
    },
    ...(options?.connection_scope
      ? {
          authorizationParams: {
            connection_scope: options.connection_scope,
          },
        }
      : {}),
  });
}
