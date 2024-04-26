import { TProfileOverview } from "app/migration/u/[githubLogin]/features/profile-overview/profile-overview.types";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";

export function ProfileOverview(_: TProfileOverview.Props) {
  const profileMock = {
    avatarUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/abf86b52ea37add55e4deda258bade06.jpeg",
    login: "The very long Pixelfact",
    bio: "Frontend Developer / API enthusiast / UI-UX lover",
    contributionCount: 144,
    rewardCount: 25,
    contributedProjectCount: 10,
    leadedProjectCount: 4,
    contributorPosition: 32,
    contributorRank: "10%",
  };

  return (
    <Card className="flex h-[431px] w-full flex-col items-start justify-start gap-10" background="base">
      <div className="flex w-full flex-row items-start justify-between gap-2">
        <div className="flex h-[176px] flex-1 items-center justify-center bg-card-background-heavy">
          <ProfileCard {...profileMock} />
        </div>
        <div className="flex h-[176px] flex-1 items-center justify-center bg-card-background-heavy">SUMMARY</div>
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
