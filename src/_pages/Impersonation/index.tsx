"use client";

import { bootstrap } from "core/bootstrap";
import { buildImpersonationHeaders } from "core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-helpers";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import MeApi from "src/api/me/index";
import { usePosthog } from "src/hooks/usePosthog";

import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { useImpersonation } from "components/features/impersonation/use-impersonation";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

const ImpersonationPage = () => {
  const { T } = useIntl();
  const { userId } = useParams();
  const router = useRouter();
  const { getImpersonateClaim, setImpersonateClaim, clearImpersonateClaim } = useImpersonation();
  const impersonateClaims = getImpersonateClaim();
  const { refetch } = MeApi.queries.useGetMe({ options: { retry: 1 } });
  const { reset } = usePosthog();

  useEffect(() => {
    if (!userId) {
      router.push(NEXT_ROUTER.home.all);
    } else {
      // Reset Posthog before refetching to so once refetch completes Posthog can update with impersonated user
      reset();
      setImpersonateClaim({ sub: `github|${userId}` });
      bootstrap.setImpersonationProvider({
        getImpersonationHeaders: () => buildImpersonationHeaders({ githubUserId: String(userId) }),
      });
      refetch()
        .then(response => {
          const { data: userInfo, isFetching, isError } = response;
          const claimedGithubUserId = getGithubUserIdFromSub(impersonateClaims?.sub);

          if (isError) {
            clearImpersonateClaim();
            bootstrap.setImpersonationProvider(null);
            reset(); // Return to initial user
            router.push(NEXT_ROUTER.notFound);
          }

          if (userInfo && !isFetching && claimedGithubUserId) {
            if (userInfo?.githubUserId === claimedGithubUserId) {
              router.push(NEXT_ROUTER.home.all);
            } else {
              clearImpersonateClaim();
              bootstrap.setImpersonationProvider(null);
              reset(); // Return to initial user
              router.push(NEXT_ROUTER.notFound);
            }
          }
        })
        .catch(() => {
          clearImpersonateClaim();
          bootstrap.setImpersonationProvider(null);
          reset(); // Return to initial user
          router.push(NEXT_ROUTER.notFound);
        });
    }
  }, [userId, impersonateClaims]);

  return <BaseLink href={NEXT_ROUTER.home.all}>{T("notFound.button")}</BaseLink>;
};

export default ImpersonationPage;
