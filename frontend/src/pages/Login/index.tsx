import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { RefreshToken } from "src/types";
import useSignupRedirection from "./hooks/useSignUpRedirection";

export const AUTH_CODE_QUERY_KEY = "refreshToken";

export default function Login() {
  const { login, isLoggedIn, user, githubUserId } = useAuth();
  const [searchParams] = useSearchParams();
  const refreshToken = searchParams.get(AUTH_CODE_QUERY_KEY);
  const { T } = useIntl();
  const navigate = useNavigate();
  const { loading, url } = useSignupRedirection({ userId: user?.id, githubUserId });
  useEffect(() => {
    if (refreshToken) {
      login(refreshToken as RefreshToken);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (isLoggedIn && !loading) {
      navigate(url);
    }
  }, [isLoggedIn, loading]);

  return (
    <>
      {refreshToken ? (
        <div className="flex justify-center mt-10 text-2xl">{T("github.loggingIn")}</div>
      ) : (
        <div className="flex justify-center mt-10 text-2xl text-red-600">{T("github.tokenMissing")}</div>
      )}
    </>
  );
}
