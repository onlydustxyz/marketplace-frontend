import { usersApiClient } from "api-client/resources/users";

import { ProfileSummary } from "app/migration/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary";
import { TProfileOverview } from "app/migration/u/[githubLogin]/features/profile-overview/profile-overview.types";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { Flex } from "components/layout/flex/flex";

import { MostActiveSection } from "./components/most-active-section/most-active-section";

export async function ProfileOverview({ githubLogin }: TProfileOverview.Props) {
  const userProfile = await usersApiClient.fetch
    .getUserPublicProfileByGithubLogin(githubLogin)
    .request()
    .then(res => res);

  if (!userProfile) return null;

  const languages = await usersApiClient.fetch
    .getUserPublicLanguages(userProfile.githubUserId, {
      pageSize: 4,
      pageIndex: 0,
    })
    .request()
    .then(res =>
      res.languages.map(language => ({
        logoUrl: language.language.logoUrl,
        name: language.language.name,
        contributionCount: language.contributionCount,
        rewardCount: language.rewardCount,
        totalUsdEquivalent: language.totalEarnedUsd,
        status: language.contributingStatus,
      }))
    );

  const ecosystems = await usersApiClient.fetch
    .getUserPublicEcosystems(userProfile.githubUserId, {
      pageSize: 2,
      pageIndex: 0,
    })
    .request()
    .then(res =>
      res.ecosystems?.map(ecosystem => ({
        logoUrl: ecosystem.ecosystem.logoUrl,
        name: ecosystem.ecosystem.name,
        contributionCount: ecosystem.contributionCount,
        rewardCount: ecosystem.rewardCount,
        totalUsdEquivalent: ecosystem.totalEarnedUsd,
        status: ecosystem.contributingStatus,
      }))
    );

  return (
    <Flex direction="col" className="w-full gap-4 md:gap-0">
      <div className="flex md:hidden">
        <ProfileCard login={userProfile.login} avatarUrl={userProfile.avatarUrl} {...userProfile.statsSummary} />
      </div>

      <Card className="flex w-full flex-col items-start justify-start gap-6 md:gap-10" background="base">
        <div className="flex w-full flex-row flex-wrap items-start justify-between gap-10">
          <div className="hidden flex-1 md:flex">
            <ProfileCard login={userProfile.login} avatarUrl={userProfile.avatarUrl} {...userProfile.statsSummary} />
          </div>

          <div className="flex flex-1">
            <ProfileSummary
              bio={userProfile.bio}
              contacts={userProfile.contacts}
              signedUpOnGithubAt={userProfile.signedUpOnGithubAt}
              signedUpAt={userProfile.signedUpAt}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:gap-10">
          {languages.length ? (
            <div className="flex w-full flex-1">
              <MostActiveSection
                icon={{
                  remixName: "ri-code-s-slash-line",
                }}
                title={{
                  translate: {
                    token: "v2.pages.publicProfile.header.languages.title",
                  },
                }}
                list={languages}
                wrapperClassName="xl:grid-cols-4"
              />
            </div>
          ) : null}

          <div className="flex w-full md:w-1/3">
            {ecosystems?.length ? (
              <MostActiveSection
                icon={{
                  remixName: "ri-global-line",
                }}
                title={{
                  translate: {
                    token: "v2.pages.publicProfile.header.ecosystems.title",
                  },
                }}
                list={ecosystems}
                wrapperClassName="md:grid-cols-1 xl:grid-cols-2"
              />
            ) : null}
          </div>
        </div>
      </Card>
    </Flex>
  );
}
