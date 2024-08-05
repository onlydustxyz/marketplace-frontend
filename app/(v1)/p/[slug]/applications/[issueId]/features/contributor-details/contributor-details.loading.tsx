import { ActivityLoading } from "app/(v1)/(home)/features/activity/activity.loading";
import { MostActiveEcosystemsLoading } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-ecosystems/most-active-ecosystems.loading";
import { MostActiveLanguagesLoading } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-languages/most-active-languages.loading";
import { TotalEarnedGraphLoading } from "app/(v1)/u/[githubLogin]/features/total-earned-graph/total-earned-graph.loading";

import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { ProfileCardLoading } from "components/features/profile-card/profile-card.loading";
import { Flex } from "components/layout/flex/flex";

export function ContributorDetailsLoading() {
  return (
    <Flex direction="col" className="flex-1 gap-6 overflow-hidden">
      <ProfileCardLoading className="w-full" />

      <Card background="base" hasPadding={false} border={false} className="relative">
        <Flex className="w-full flex-col gap-6 p-4">
          <MostActiveLanguagesLoading />
          <MostActiveEcosystemsLoading />

          <Flex direction="col" className="gap-3" width="full">
            <SkeletonEl width="100%" height={20} />

            <Flex className="w-full items-stretch gap-3">
              <ActivityLoading />
              <TotalEarnedGraphLoading />
            </Flex>
          </Flex>

          <Flex className="w-full flex-col gap-3">
            <SkeletonEl width="100%" height={20} />
            <SkeletonEl width="100%" height={112} />
          </Flex>

          <Flex className="w-full flex-col gap-3">
            <SkeletonEl width="100%" height={20} />
            <SkeletonEl width="100%" height={112} />
          </Flex>
        </Flex>

        <div className="sticky bottom-0 left-0 flex flex-row items-center justify-end gap-3 bg-card-background-base px-4 py-3">
          <SkeletonEl width={76} height={48} />
          <SkeletonEl width={162} height={48} />
        </div>
      </Card>
    </Flex>
  );
}
