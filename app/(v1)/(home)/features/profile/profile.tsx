"use client";

import { usersApiClient } from "api-client/resources/users";

import { ProfileLoading } from "app/(v1)/(home)/features/profile/profile.loading";
import styles from "app/(v1)/(home)/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function Profile() {
  const { T } = useIntl();
  const { githubUserId = 0, user } = useCurrentUser();

  const { data: userProfile, isLoading } = usersApiClient.queries.useGetUserPublicProfileByGithubId({
    pathParams: { githubId: githubUserId },
    options: {
      enabled: !!githubUserId,
    },
  });

  if (isLoading) return <ProfileLoading />;
  if (!userProfile) return null;

  return (
    <div className={cn("w-full", styles.areaProfile)}>
      <Section
        iconProps={{ remixName: "ri-shining-line" }}
        titleProps={{ translate: { token: "v2.pages.home.profile.title" } }}
        rightContent={
          <>
            <BaseLink
              href={NEXT_ROUTER.publicProfile.root(user?.login ?? "")}
              className={"hidden gap-1 text-spacePurple-500 sm:flex"}
            >
              <Typography variant="body-s-bold" translate={{ token: "v2.pages.home.profile.viewProfile" }} />
              <Icon remixName="ri-arrow-right-s-line" size={16} />
            </BaseLink>
            <BaseLink
              href={NEXT_ROUTER.publicProfile.root(user?.login ?? "")}
              className={"block sm:hidden"}
              title={T("v2.pages.home.profile.viewProfile")}
            >
              <Button variant={"secondary"} size={"s"} iconOnly>
                <Icon remixName={"ri-user-line"} />
              </Button>
            </BaseLink>
          </>
        }
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
