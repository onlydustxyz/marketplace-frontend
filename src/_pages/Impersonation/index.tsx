import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useImpersonation } from "components/features/impersonation/use-impersonation.tsx";
import MeApi from "src/api/me/index.ts";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.util.ts";
import { useIntl } from "src/hooks/useIntl.tsx";

const ImpersonationPage = () => {
  const { T } = useIntl();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { getImpersonateClaim, setImpersonateClaim, clearImpersonateClaim } = useImpersonation();
  const impersonateClaims = getImpersonateClaim();
  const { refetch } = MeApi.queries.useGetMe({ options: { retry: 1 } });

  useEffect(() => {
    if (!userId) {
      navigate(RoutePaths.Projects);
    } else {
      setImpersonateClaim({ sub: `github|${userId}` });
      refetch()
        .then(response => {
          const { data: userInfo, isFetching, isError } = response;
          const claimedGithubUserId = getGithubUserIdFromSub(impersonateClaims?.sub);

          if (isError) {
            clearImpersonateClaim();
            navigate(RoutePaths.NotFound);
          }

          if (userInfo && !isFetching && claimedGithubUserId) {
            if (userInfo?.githubUserId === claimedGithubUserId) {
              navigate(RoutePaths.Projects);
            } else {
              clearImpersonateClaim();
              navigate(RoutePaths.NotFound);
            }
          }
        })
        .catch(() => {
          clearImpersonateClaim();
          navigate(RoutePaths.NotFound);
        });
    }
  }, [userId, impersonateClaims]);

  return <Link to={RoutePaths.Projects}>{T("notFound.button")}</Link>;
};

export default ImpersonationPage;
