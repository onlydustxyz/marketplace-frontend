import { usersApiClient } from "api-client/resources/users";

import { ProfileSummary } from "app/migration/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary";
import { TProfileOverview } from "app/migration/u/[githubLogin]/features/profile-overview/profile-overview.types";

import { IMAGES } from "src/assets/img";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { Flex } from "components/layout/flex/flex";

import { TMostActiveCard } from "./components/most-active-section/most-active-card/most-active-card.types";
import { MostActiveSection } from "./components/most-active-section/most-active-section";

export async function ProfileOverview({ githubLogin }: TProfileOverview.Props) {
  const mostActiveLanguagesMock: TMostActiveCard.Props[] = [
    {
      logoUrl: IMAGES.logo.space,
      name: "Rust",
      contributionCount: 20,
      rewardCount: 2,
      totalUsdEquivalent: 800,
      status: "bad",
    },
    {
      logoUrl: IMAGES.logo.space,
      name: "Typescript",
      contributionCount: 120,
      rewardCount: 25,
      totalUsdEquivalent: 10000,
      status: "neutral",
    },
    {
      logoUrl: IMAGES.logo.space,
      name: "Ruby on Rails",
      contributionCount: 300,
      rewardCount: 70,
      totalUsdEquivalent: 45000,
      status: "good",
    },
    {
      logoUrl: IMAGES.logo.space,
      name: "Noir",
      contributionCount: 500,
      rewardCount: 150,
      totalUsdEquivalent: 75000,
      status: "good",
    },
  ];

  const mostActiveEcosystemsMock: TMostActiveCard.Props[] = [
    {
      logoUrl: IMAGES.logo.space,
      name: "Skartnet",
      contributionCount: 300,
      rewardCount: 80,
      totalUsdEquivalent: 1500,
      status: "good",
    },
    {
      logoUrl: IMAGES.logo.space,
      name: "Ethereum",
      contributionCount: 50,
      rewardCount: 20,
      totalUsdEquivalent: 300,
      status: "bad",
    },
  ];

  const userProfile = await usersApiClient.fetch.getUserPublicProfileByGithubLogin(githubLogin).request();

  return (
    <Flex direction="col" className="gap-4 md:gap-0">
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
              list={mostActiveLanguagesMock}
              wrapperClassName="xl:grid-cols-4"
            />
          </div>

          <div className="flex w-full md:w-1/3">
            <MostActiveSection
              icon={{
                remixName: "ri-global-line",
              }}
              title={{
                translate: {
                  token: "v2.pages.publicProfile.header.ecosystems.title",
                },
              }}
              list={mostActiveEcosystemsMock}
              wrapperClassName="md:grid-cols-1 xl:grid-cols-2"
            />
          </div>
        </div>
      </Card>
    </Flex>
  );
}
