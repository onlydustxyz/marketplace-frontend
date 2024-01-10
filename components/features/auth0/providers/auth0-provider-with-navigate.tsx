import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  // const navigate = useNavigate();
  const domain = process.env.NEXT_PUBLIC_AUTH0_PROVIDER_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
  const connectionName = process.env.NEXT_PUBLIC_AUTH0_DEFAULT_CONNECTION_NAME;

  // TODO fix and use this handler to redirect to origin path
  // const onRedirectCallback = (appState: AppState | undefined) => {
  //   console.log("appState", appState);
  //   redirect(appState?.returnTo || RoutePaths.Projects);
  // };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        connection: connectionName,
      }}
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
