import { usersApiClient } from "api-client/resources/users";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { Activity } from "./components/activity/activity";
import { MostActiveEcosystems } from "./components/most-active-ecosystems/most-active-ecosystems";
import { MostActiveLanguages } from "./components/most-active-languages/most-active-languages";
import { TotalEarned } from "./components/total-earned/total-earned";
import { TContributorDetails } from "./contributor-details.types";

export function ContributorDetails({ githubId }: TContributorDetails.Props) {
  const { data: userProfile } = usersApiClient.queries.useGetUserPublicProfileByGithubId({
    pathParams: { githubId },
  });

  if (!userProfile) return null;

  return (
    <Flex direction="col" className="flex-1 gap-6">
      <ProfileCard login={userProfile.login} avatarUrl={userProfile.avatarUrl} {...userProfile.statsSummary} />
      <Card background="base" hasPadding={false} border={false}>
        <Flex className="w-full flex-col gap-6 p-4">
          <MostActiveLanguages githubId={githubId} />
          <MostActiveEcosystems githubId={githubId} />
          <Flex direction="col" className="gap-3" width="full">
            <Flex alignItems="center" className="gap-2">
              <Icon remixName="ri-sparkling-line" size={20} />
              <Typography
                translate={{ token: "v2.pages.project.details.applicationDetails.profile.stats.title" }}
                variant="body-m-bold"
              />
            </Flex>
            <Flex className="w-full items-stretch gap-3">
              <Activity githubId={githubId} />
              <TotalEarned githubId={githubId} />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
