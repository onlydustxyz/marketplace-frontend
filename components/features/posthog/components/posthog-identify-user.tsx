"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import MeApi from "src/api/me";
import { usePosthog } from "src/hooks/usePosthog";

export function PosthogIdentifyUser() {
  const { isAuthenticated } = useAuth0();
  const { identify } = usePosthog();

  const { data } = MeApi.queries.useGetMe({});

  useEffect(() => {
    if (isAuthenticated && data) {
      const { isAdmin: admin, createdAt: created_at, githubUserId: github_user_id, id, email } = data;
      identify(id, { admin, created_at, email, github_user_id });
    }
  }, [isAuthenticated, data]);

  return null;
}
