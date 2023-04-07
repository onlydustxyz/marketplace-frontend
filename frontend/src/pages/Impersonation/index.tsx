import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useIntl } from "src/hooks/useIntl";

const ImpersonationPage = () => {
  const { userId } = useParams();
  const { T } = useIntl();
  const navigate = useNavigate();
  const { setImpersonationSet } = useImpersonationClaims();
  useEffect(() => {
    const password = window.prompt(T("impersonation.passwordPrompt"));
    if (password && password !== "" && userId) {
      setImpersonationSet({ password, userId });
    }
    navigate(RoutePaths.Projects);
  });
  return (
    <div>
      <h1>Impersonation</h1>
    </div>
  );
};

export default ImpersonationPage;
