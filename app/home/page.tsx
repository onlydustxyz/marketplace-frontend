"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Activity } from "app/home/features/activity/activity";
import { Journey } from "app/home/features/journey/journey";
import { LeadProjects } from "app/home/features/lead-projects/lead-projects";
import { Profile } from "app/home/features/profile/profile";
import { ProfileLoading } from "app/home/features/profile/profile.loading";
import { RecommendedProjects } from "app/home/features/recommended-projects/recommended-projects";
import { Rewards } from "app/home/features/rewards/rewards";
import { TrendyProjects } from "app/home/features/trendy-projects/trendy-projects";

import { cn } from "src/utils/cn";

import { Container } from "components/layout/container/container";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import styles from "./styles/styles.module.css";

export default function HomePage() {
  const { isAuthenticated } = useAuth0();
  const { githubUserId } = useCurrentUser();
  const showJourney = true;
  const templateArea = useMemo(() => {
    if (isAuthenticated) {
      if (showJourney) return styles.gridAuthenticatedWithJourney;
      return styles.gridAuthenticated;
    }
    return styles.gridUnauthenticated;
  }, [isAuthenticated, showJourney]);

  return (
    <Container>
      <div className={cn("px w-full gap-x-6 gap-y-12 py-8", templateArea)}>
        {showJourney ? <Journey /> : null}

        {isAuthenticated && githubUserId ? (
          <ErrorBoundary fallback={null}>
            <Suspense fallback={<ProfileLoading />}>
              <Profile githubUserId={githubUserId} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <ProfileLoading />
        )}
        {isAuthenticated ? <Rewards /> : null}
        {isAuthenticated ? <LeadProjects /> : null}
        {isAuthenticated ? <RecommendedProjects /> : null}

        {!isAuthenticated ? <TrendyProjects /> : null}
        {!isAuthenticated ? <Activity /> : null}
      </div>
    </Container>
  );
}
