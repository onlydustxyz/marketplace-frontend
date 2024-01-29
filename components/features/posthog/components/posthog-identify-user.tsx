"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";
import { useEffect } from "react";
import MeApi from "src/api/me";
import { usePosthog } from "src/hooks/usePosthog";

export function PosthogIdentifyUser() {
  const { isAuthenticated, user } = useAuth0();
  const githubUserId = getGithubUserIdFromSub(user?.sub);
  const { identify, capture } = usePosthog();

  const { data } = MeApi.queries.useGetMe({});

  useEffect(() => {
    if (isAuthenticated && githubUserId && data) {
      const { isAdmin: admin, createdAt: created_at, githubUserId: github_user_id, id, email } = data;

      identify(id, { admin, created_at, email, github_user_id });

      if (githubUserId !== github_user_id) {
        capture("impersonated");
      }
    }
  }, [isAuthenticated, githubUserId, data]);

  return null;
}
