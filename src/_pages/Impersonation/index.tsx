import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { Toaster } from "src/components/Toaster";

import useImpersonation from "../../../components/features/auth0/impersonation/use-impersonation.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useImpersonationClaims } from "../../../components/features/auth0/impersonation/use-impersonation-claims-Bis.tsx";

const ImpersonationPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setImpersonationSet, clearImpersonationSet } = useImpersonationClaims();
  const { invalidImpersonation, impersonating } = useImpersonation();
  const { getIdTokenClaims } = useAuth0();

  if (!getIdTokenClaims) {
    navigate(RoutePaths.Projects);
  }

  if (userId) {
    setImpersonationSet({ sub: userId });
  }

  // const onPasswordSubmit = (password: string) => {
  //   if (userId) {
  //     setImpersonationSet({ password, userId });
  //   }
  // };

  useEffect(() => {
    if (!userId) {
      navigate(RoutePaths.Projects);
    }
  }, [userId]);

  useEffect(() => {
    if (invalidImpersonation) {
      clearImpersonationSet();
    }
  }, [invalidImpersonation]);

  useEffect(() => {
    if (impersonating) {
      navigate(RoutePaths.Projects);
    }
  }, [impersonating]);

  return (
    <>
      <div className="flex h-[calc(100dvh)] items-center justify-center bg-space">
        {/*<PasswordForm onSubmit={onPasswordSubmit} />*/}coucou
      </div>
      <Toaster />
    </>
  );
};

export default ImpersonationPage;
