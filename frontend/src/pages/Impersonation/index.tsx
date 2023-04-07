import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { Toaster } from "src/components/Toaster";
import { useAuth } from "src/hooks/useAuth";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import PasswordForm from "src/pages/Impersonation/PasswordForm";

const ImpersonationPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setImpersonationSet, clearImpersonationSet } = useImpersonationClaims();
  const { invalidImpersonation, user } = useAuth();

  const onPasswordSubmit = (password: string) => {
    if (userId) {
      setImpersonationSet({ password, userId });
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate(RoutePaths.Projects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (invalidImpersonation) {
      clearImpersonationSet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidImpersonation]);

  useEffect(() => {
    if (user) {
      navigate(RoutePaths.Projects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-space">
        <PasswordForm onSubmit={onPasswordSubmit} />
      </div>
      <Toaster />
    </>
  );
};

export default ImpersonationPage;
