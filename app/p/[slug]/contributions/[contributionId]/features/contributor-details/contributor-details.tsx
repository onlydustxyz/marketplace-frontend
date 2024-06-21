import { usersApiClient } from "api-client/resources/users";

import { MostActiveEcosystems } from "app/p/[slug]/contributions/[contributionId]/features/contributor-details/components/most-active-ecosystems/most-active-ecosystems";
import { MostActiveLanguages } from "app/p/[slug]/contributions/[contributionId]/features/contributor-details/components/most-active-languages/most-active-languages";

import { Card } from "components/ds/card/card";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { Flex } from "components/layout/flex/flex";

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
        </Flex>
      </Card>
    </Flex>
  );
}
