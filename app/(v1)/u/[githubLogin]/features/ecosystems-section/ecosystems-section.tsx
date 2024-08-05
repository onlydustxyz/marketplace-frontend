import { usersApiClient } from "api-client/resources/users";

import { DetailsAccordion } from "app/(v1)/u/[githubLogin]/features/details-accordion/details-accordion";

import { IMAGES } from "src/assets/img";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Typography } from "components/layout/typography/typography";

import { TEcosystemsSection } from "./ecosystems-section.types";

export async function EcosystemsSection(props: TEcosystemsSection.Props) {
  const { githubUserId } = props;

  const ecosystems = await usersApiClient.fetch
    .getUserPublicEcosystems({
      pathParams: { githubId: githubUserId },
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    })
    .request()
    .then(res =>
      res.ecosystems?.map(ecosystem => ({
        name: ecosystem.ecosystem.name,
        avatarUrl: ecosystem.ecosystem.bannerUrl || ecosystem.ecosystem.logoUrl,
        contributingStatus: ecosystem.contributingStatus,
        contributionCount: ecosystem.contributionCount,
        projectsCount: ecosystem.projects.length,
        rewardCount: ecosystem.rewardCount,
        totalEarnedUsd: ecosystem.totalEarnedUsd,
        projects: ecosystem.projects,
        ecosystemId: ecosystem.ecosystem.id,
      }))
    );

  return (
    <Flex direction="col" width="full" className="gap-4 overflow-hidden">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.ecosystemsDetails.title" }} />

      {ecosystems?.length ? (
        <DetailsAccordion details={ecosystems} githubUserId={githubUserId} />
      ) : (
        <Card background={"base"}>
          <EmptyState
            illustrationSrc={IMAGES.global.categories}
            title={{ token: "v2.pages.publicProfile.contributions.empty.title" }}
            description={{ token: "v2.pages.publicProfile.contributions.empty.description" }}
          />
        </Card>
      )}
    </Flex>
  );
}
