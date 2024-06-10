"use client";

import { usersApiClient } from "api-client/resources/users";

import { ProfileLoading } from "app/home/features/profile/profile.loading";
import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { ProfileCard } from "components/features/profile-card/profile-card";
import { Section } from "components/layout/section/section";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function Profile() {
  const { githubUserId } = useCurrentUser();

  const { data: userProfile, isLoading } = usersApiClient.queries.useGetUserPublicProfileByGithubId(githubUserId ?? 0, {
    enabled: !!githubUserId,
  });

  if (isLoading) return <ProfileLoading />;
  if (!userProfile) return null;

  return (
    <div className={cn("w-full", styles.areaProfile)}>
      <Section
        iconProps={{ remixName: "ri-shining-line" }}
        titleProps={{ translate: { token: "v2.pages.home.profile.title" } }}
      >
        <ProfileCard
          login={userProfile.login}
          avatarUrl={userProfile.avatarUrl}
          {...userProfile.statsSummary}
          isInPopover
        />
      </Section>
    </div>
  );
}
