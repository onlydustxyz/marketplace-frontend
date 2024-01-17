"use client";

import { useAuth0 } from "@auth0/auth0-react";
import posthog from "posthog-js";
import { useEffect } from "react";
import { getGithubUserIdFromSub } from "../../auth0/utils/getGithubUserIdFromSub.util.ts";

export function PosthogIdentifyUser() {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      // TODO get infos from /api/v1/me as well as auth0 user
      // Get backend to add created_at to /api/v1/me

      console.log({ user });

      const { created_at, email, name, sub } = user;
      const github_user_id = getGithubUserIdFromSub(sub);

      posthog.identify(sub, { created_at, email, github_user_id, name });
    }
  }, [isAuthenticated, user]);

  return null;
}
