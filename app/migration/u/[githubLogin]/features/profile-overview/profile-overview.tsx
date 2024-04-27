import { TProfileOverview } from "app/migration/u/[githubLogin]/features/profile-overview/profile-overview.types";
import { ProfileSummary } from "app/migration/u/[githubLogin]/features/profile-summary/profile-summary";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

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
      <div className="flex w-full flex-row items-start justify-between gap-2">
        <div className="flex h-[176px] flex-1 items-center justify-center bg-card-background-heavy">
          MOST ACTIVE LANGUAGE
        </div>
        <div className="flex h-[176px] w-1/3 items-center justify-center bg-card-background-heavy">
          MOST ACTIVE ECOSYSTEM
        </div>
      </div>
    </Card>
  );
}
