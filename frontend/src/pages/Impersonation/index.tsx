import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import PasswordForm from "src/pages/Impersonation/PasswordForm";

const ImpersonationPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { setImpersonationSet } = useImpersonationClaims();

  const onPasswordSubmit = (password: string) => {
    if (userId) {
      setImpersonationSet({ password, userId });
    }
    navigate(RoutePaths.Projects);
  };

  useEffect(() => {
    if (!userId) {
      navigate(RoutePaths.Projects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="h-screen flex items-center justify-center">
      <PasswordForm onSubmit={onPasswordSubmit} />
    </div>
  );
};

export default ImpersonationPage;
