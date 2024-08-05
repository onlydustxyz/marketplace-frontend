import { Suspense } from "react";

import { MostActiveEcosystems } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-ecosystems/most-active-ecosystems";
import { MostActiveEcosystemsLoading } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-ecosystems/most-active-ecosystems.loading";
import { MostActiveLanguages } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-languages/most-active-languages";
import { MostActiveLanguagesLoading } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-languages/most-active-languages.loading";
import { ProfileSummary } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary";
import { TProfileOverview } from "app/(v1)/u/[githubLogin]/features/profile-overview/profile-overview.types";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { Flex } from "components/layout/flex/flex";

export async function ProfileOverview({ userProfile }: TProfileOverview.Props) {
  if (!userProfile) return null;

  return (
    <Flex direction="col" className="w-full gap-4 md:gap-0">
      <div className="flex md:hidden">
        <ProfileCard login={userProfile.login} avatarUrl={userProfile.avatarUrl} {...userProfile.statsSummary} />
      </div>

      <Card className="flex w-full flex-col items-start justify-start" background="base">
        <div className="flex w-full flex-row flex-wrap justify-between gap-10">
          <div className="hidden flex-1 md:flex">
            <ProfileCard login={userProfile.login} avatarUrl={userProfile.avatarUrl} {...userProfile.statsSummary} />
          </div>

          <div className="flex flex-1">
            <ProfileSummary
              bio={userProfile.bio}
              contacts={userProfile.contacts}
              signedUpOnGithubAt={userProfile.signedUpOnGithubAt}
              signedUpAt={userProfile.signedUpAt}
              htmlUrl={userProfile.htmlUrl}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:gap-10">
          <Suspense fallback={<MostActiveLanguagesLoading />}>
            <MostActiveLanguages githubUserId={userProfile.githubUserId} />
          </Suspense>
          <Suspense fallback={<MostActiveEcosystemsLoading />}>
            <MostActiveEcosystems githubUserId={userProfile.githubUserId} />
          </Suspense>
        </div>
      </Card>
    </Flex>
  );
}
