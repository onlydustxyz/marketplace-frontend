"use client";

import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { useLocalStorage } from "react-use";

import { usePosthog } from "src/hooks/usePosthog";

const domain = process.env.NEXT_PUBLIC_AUTH0_PROVIDER_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
const connectionName = process.env.NEXT_PUBLIC_AUTH0_DEFAULT_CONNECTION_NAME;
const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

export function Auth0ProviderWithNavigate({ children }: { children: ReactNode }) {
  const { capture } = usePosthog();
  const [scopeStorage] = useLocalStorage("dynamic-github-public-repo-scope");

  const onRedirectCallback = (appState: AppState | undefined, user?: User) => {
    if (user) {
      capture("user_logged_in");
    }

    if (!user) {
      console.error("Auth0Provider: user does not exist.", {
        appState,
      });
    }
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
        connection_scope: scopeStorage,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
