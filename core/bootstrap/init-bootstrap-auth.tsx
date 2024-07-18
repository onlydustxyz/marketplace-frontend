import { useAuth0 } from "@auth0/auth0-react";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { bootstrap } from "core/bootstrap/index";
import { useEffect } from "react";

export function InitBootstrapAuth() {
  const auth0 = useAuth0();
  const { setClientBootstrap } = useClientBootstrapContext();

  useEffect(() => {
    const { isAuthenticated, getAccessTokenSilently: getAccessToken, logout, loginWithRedirect } = auth0;
    const authProvider = { isAuthenticated, getAccessToken, logout, loginWithRedirect };

    bootstrap.setAuthProvider(authProvider);

    setClientBootstrap(prevState => ({ ...prevState, authProvider }));
  }, [auth0]);

  return null;
}
