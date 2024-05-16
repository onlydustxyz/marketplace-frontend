import { usersApiClient } from "api-client/resources/users";

import { DetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TLanguagesSection } from "./languages-section.types";

export async function LanguagesSection(props: TLanguagesSection.Props) {
  const { githubUserId } = props;

  const languages = await usersApiClient.fetch
    .getUserPublicLanguages(githubUserId, {
      pageSize: 10,
      pageIndex: 0,
    })
    .request()
    .then(res =>
      res.languages.map(language => ({
        name: language.language.name,
        avatarUrl: language.language.bannerUrl || language.language.logoUrl,
        contributingStatus: language.contributingStatus,
        contributionCount: language.contributionCount,
        projectsCount: language.projects.length,
        rewardCount: language.rewardCount,
        totalEarnedUsd: language.totalEarnedUsd,
        projects: language.projects,
        languageId: language.language.id,
      }))
    );

  if (!languages?.length) return null;

  return (
    <Flex direction="col" width="full" className="gap-4">
      <Typography variant="title-m" translate={{ token: "v2.pages.publicProfile.languagesDetails" }} />

      <DetailsAccordion details={languages} githubUserId={githubUserId} />
    </Flex>
  );
}
