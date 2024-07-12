import { useAuth0 } from "@auth0/auth0-react";
import { bootstrap } from "core/bootstrap/index";
import { useEffect } from "react";

export function InitBootstrapAuth() {
  const { isAuthenticated, getAccessTokenSilently: getAccessToken, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      bootstrap.setAuthProvider({ isAuthenticated, getAccessToken, logout });
    } else {
      bootstrap.setAuthProvider(null);
    }
  }, [isAuthenticated]);

  return null;
}
