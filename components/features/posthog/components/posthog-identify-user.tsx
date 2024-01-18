"use client";

import { useAuth0 } from "@auth0/auth0-react";
import posthog from "posthog-js";
import { useEffect } from "react";
import MeApi from "src/api/me";

export function PosthogIdentifyUser() {
  const { isAuthenticated, user } = useAuth0();

  const { data } = MeApi.queries.useGetMe({});

  useEffect(() => {
    if (isAuthenticated && user && data) {
      const { email } = user;
      const { isAdmin: admin, created_at, githubUserId: github_user_id, id } = data;

      posthog.identify(id, { admin, created_at, email, github_user_id });
    }
  }, [isAuthenticated, user, data]);

  return null;
}
