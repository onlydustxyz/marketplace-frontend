import { ProfileSummary } from "app/migration/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary";
import { TProfileOverview } from "app/migration/u/[githubLogin]/features/profile-overview/profile-overview.types";

import { IMAGES } from "src/assets/img";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { TMostActiveCard } from "./components/most-active-section/most-active-card/most-active-card.types";
import { MostActiveSection } from "./components/most-active-section/most-active-section";

export function ProfileOverview(_: TProfileOverview.Props) {
  const profileCardMock = {
    avatarUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/abf86b52ea37add55e4deda258bade06.jpeg",
    login: "The very long Pixelfact",
    qualifier: "Onlydust Legend",
    contributionCount: 144,
    rewardCount: 25,
    contributedProjectCount: 10,
    leadedProjectCount: 4,
    contributorPosition: 32,
    contributorRank: "10%",
  };

  const profileRestInfo = {
    bio: "Hey, I’m an independent security researcher focused on security zevM. Lead Security Researcher @Spearbit. Here to develop my OSS skills and find new opportunities.",
    socials: [
      {
        name: "GitHub",
        iconName: "ri-github-fill" as RemixIconsName,
        url: "https://github.com",
      },
      {
        name: "Telegram",
        iconName: "ri-telegram-fill" as RemixIconsName,
        url: "https://linkedin.com",
      },
      {
        name: "Twitter",
        iconName: "ri-twitter-x-fill" as RemixIconsName,
        url: "https://twitter.com",
      },
      {
        name: "Discord",
        iconName: "ri-discord-fill" as RemixIconsName,
        url: "https://discord.com",
      },
      {
        name: "Mail",
        iconName: "ri-mail-line" as RemixIconsName,
        url: "mailto:@mail.com",
      },
    ],
    githubRegistrationDate: "2020-06-01",
    onlydustRegistrationDate: "2023-05-01",
  };

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

  return (
    <Card className="flex w-full flex-col items-start justify-start gap-10" background="base">
      <div className="flex w-full flex-row flex-wrap items-start justify-between gap-2">
        <div className="flex flex-1">
          <ProfileCard {...profileCardMock} />
        </div>
        <div className="flex flex-1">
          <ProfileSummary {...profileRestInfo} />
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
  );
}
