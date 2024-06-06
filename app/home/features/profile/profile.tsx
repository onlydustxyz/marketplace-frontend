import { usersApiClient } from "api-client/resources/users";

import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { ProfileCard } from "components/features/profile-card/profile-card";
import { Section } from "components/layout/section/section";

import { TProfile } from "./profile.types";

export async function Profile({ githubUserId }: TProfile.Props) {
  const userProfile = await usersApiClient.fetch.getUserPublicProfileByGithubId(githubUserId).request();

  if (!userProfile) return null;

  return (
    <div className={cn("w-full", styles.areaProfile)}>
      <Section
        iconProps={{ remixName: "ri-code-s-slash-line" }}
        titleProps={{
          children: "Profile",
        }}
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
