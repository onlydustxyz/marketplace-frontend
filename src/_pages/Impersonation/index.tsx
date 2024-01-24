import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { useImpersonation } from "components/features/impersonation/use-impersonation";
import { usePosthog } from "src/hooks/usePosthog";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import MeApi from "src/api/me/index";
import { useIntl } from "src/hooks/useIntl";

const ImpersonationPage = () => {
  const { T } = useIntl();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { getImpersonateClaim, setImpersonateClaim, clearImpersonateClaim } = useImpersonation();
  const impersonateClaims = getImpersonateClaim();
  const { refetch } = MeApi.queries.useGetMe({ options: { retry: 1 } });
  const { reset } = usePosthog();

  useEffect(() => {
    if (!userId) {
      navigate(RoutePaths.Projects);
    } else {
      // Reset Posthog before refetching to so once refetch completes Posthog can update with impersonated user
      reset();
      setImpersonateClaim({ sub: `github|${userId}` });
      refetch()
        .then(response => {
          const { data: userInfo, isFetching, isError } = response;
          const claimedGithubUserId = getGithubUserIdFromSub(impersonateClaims?.sub);

          if (isError) {
            clearImpersonateClaim();
            reset(); // Return to initial user
            navigate(RoutePaths.NotFound);
          }

          if (userInfo && !isFetching && claimedGithubUserId) {
            if (userInfo?.githubUserId === claimedGithubUserId) {
              navigate(RoutePaths.Projects);
            } else {
              clearImpersonateClaim();
              reset(); // Return to initial user
              navigate(RoutePaths.NotFound);
            }
          }
        })
        .catch(() => {
          clearImpersonateClaim();
          reset(); // Return to initial user
          navigate(RoutePaths.NotFound);
        });
    }
  }, [userId, impersonateClaims]);

  return <Link to={RoutePaths.Projects}>{T("notFound.button")}</Link>;
};

export default ImpersonationPage;
