import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { SessionMethod, useSession, useSessionDispatch } from "src/hooks/useSession";
import { RefreshToken } from "src/types";
import useSignupRedirection from "./hooks/useSignUpRedirection";
import Loader from "src/components/Loader";

export const AUTH_CODE_QUERY_KEY = "refreshToken";

export default function Login() {
  const { login, isLoggedIn, user, githubUserId } = useAuth();
  const [searchParams] = useSearchParams();
  const refreshToken = searchParams.get(AUTH_CODE_QUERY_KEY);
  const navigate = useNavigate();
  const { loading, url } = useSignupRedirection({ userId: user?.id, githubUserId });
  const { lastLoginTime, visitedPageBeforeLogin } = useSession();
  const dispatchSession = useSessionDispatch();

  useEffect(() => {
    if (refreshToken) {
      login(refreshToken as RefreshToken);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (isLoggedIn) {
      if (!lastLoginTime && !loading) {
        dispatchSession({ method: SessionMethod.SetLastLoginTime, value: Date.now().toString() });
        navigate(url);
      } else if (lastLoginTime) {
        dispatchSession({ method: SessionMethod.SetLastLoginTime, value: Date.now().toString() });
        navigate(visitedPageBeforeLogin || RoutePaths.Projects);
      }
    }
  }, [isLoggedIn, loading]);

  return <>{refreshToken ? <Loader /> : <Navigate to={RoutePaths.Projects} />}</>;
}
