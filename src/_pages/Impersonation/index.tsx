import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useImpersonation } from "../../../components/features/impersonation/use-impersonation.tsx";
import { Link } from "react-router-dom";
import Button, { ButtonSize } from "src/components/Button/index.tsx";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine.tsx";
import { useIntl } from "src/hooks/useIntl.tsx";
import MeApi from "src/api/me/index.ts";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.util.ts";

const ImpersonationPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { T } = useIntl();
  const { isImpersonating, getImpersonateClaim, setImpersonateClaim, clearImpersonateClaim } = useImpersonation();
  const impersonateClaims = getImpersonateClaim();
  const { data: userInfo, isLoading, isError } = MeApi.queries.useGetMe({});
  const [isValidImpersonation, setIsValidImpersonation] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate(RoutePaths.Projects);
    } else {
      setImpersonateClaim({ sub: `github|${userId}` });
      const claimedGithubUserId = getGithubUserIdFromSub(impersonateClaims?.sub);

      if (isError) {
        setIsValidImpersonation(false);
        clearImpersonateClaim();
        navigate(RoutePaths.NotFound);
      }

      if (userInfo && !isLoading) {
        if (isImpersonating && userInfo?.githubUserId === claimedGithubUserId) {
          setIsValidImpersonation(true);
          navigate(RoutePaths.Projects);
        } else {
          setIsValidImpersonation(false);
          clearImpersonateClaim();
          navigate(RoutePaths.NotFound);
        }
      }
    }
  }, [userId, userInfo, isLoading, isImpersonating, impersonateClaims]);

  return !isValidImpersonation && !isLoading && isError ? (
    <>
      <div className="flex h-[calc(100dvh)] flex-col items-center justify-center gap-8 bg-space">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <div className="font-walsheim text-base text-spaceBlue-200 sm:text-lg">{T("impersonation.invalid")}</div>
        </div>
        <Link to={RoutePaths.Projects}>
          <Button size={ButtonSize.Lg}>
            <ArrowLeftSLine className="text-xl" /> {T("notFound.button")}
          </Button>
        </Link>
      </div>
    </>
  ) : null;
};

export default ImpersonationPage;
