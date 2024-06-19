"use client";

import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { ReactNode } from "react";

import { usePosthog } from "src/hooks/usePosthog";
import { useLocalStorage } from "src/hooks/useStorage/useStorage";

const domain = process.env.NEXT_PUBLIC_AUTH0_PROVIDER_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
const connectionName = process.env.NEXT_PUBLIC_AUTH0_DEFAULT_CONNECTION_NAME;
const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

export function Auth0ProviderWithNavigate({ children }: { children: ReactNode }) {
  const { capture } = usePosthog();
  // const [scopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");

  const scopeStorage = useLocalStorage<string>({
    key: "dynamic-github-public-repo-scope",
    initialValue: "",
  });

  const onRedirectCallback = (appState: AppState | undefined, user?: User) => {
    if (user) {
      capture("user_logged_in");
    }

    window.location.href = appState?.returnTo || window.location.pathname;
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        connection: connectionName,
        audience,
        connection_scope: scopeStorage.getValue(),
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
