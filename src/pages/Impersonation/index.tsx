import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { Toaster } from "src/components/Toaster";
import { useAuth } from "src/hooks/useAuth";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useTokenSet } from "src/hooks/useTokenSet";
import PasswordForm from "src/pages/Impersonation/PasswordForm";

const ImpersonationPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setImpersonationSet, clearImpersonationSet } = useImpersonationClaims();
  const { invalidImpersonation, impersonating } = useAuth();
  const { tokenSet } = useTokenSet();

  if (!tokenSet?.accessToken) {
    navigate(RoutePaths.Projects);
  }

  const onPasswordSubmit = (password: string) => {
    if (userId) {
      setImpersonationSet({ password, userId });
    }
  };

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
        <PasswordForm onSubmit={onPasswordSubmit} />
      </div>
      <Toaster />
    </>
  );
};

export default ImpersonationPage;
