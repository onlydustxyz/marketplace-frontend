import { useMemo } from "react";

import { Categories } from "app/p/[slug]/features/project-details/components/categories/categories";
import { Languages } from "app/p/[slug]/features/project-details/components/languages/languages";
import { Programs } from "app/p/[slug]/features/project-details/components/programs/programs";

import { IMAGES } from "src/assets/img";
import isDefined from "src/utils/isDefined";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Typography } from "components/layout/typography/typography";

import { Contributors } from "./components/contributors/contributors";
import { Ecosystems } from "./components/ecosystems/ecosystems";
import { MoreInfos } from "./components/more-infos/more-infos";
import { ProjectLeads } from "./components/project-leads/project-leads";
import { TProjectDetails } from "./project-details.types";

export function ProjectDetails({ project }: TProjectDetails.Props) {
  const { contributorCount, topContributors, leaders, moreInfos, ecosystems, categories, programs, languages } =
    project;

  const projectLeads = useMemo(() => {
    return leaders?.filter(lead => isDefined(lead?.login)) || [];
  }, [leaders]);

  const communityLinkPatterns = ["t.me", "discord.com"];
  const nonCommunityMoreInfos = useMemo(() => {
    return moreInfos?.filter(link => !communityLinkPatterns.some(pattern => link.url.includes(pattern)));
  }, [moreInfos]);

  if (!projectLeads.length && !contributorCount) {
    return (
      <Card background="base" hasPadding={false}>
        <EmptyState
          illustrationSrc={IMAGES.icons.compass}
          description={{ token: "v2.pages.project.overview.projectDetails.empty" }}
        />
      </Card>
    );
  }

  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="divide-y divide-greyscale-50/8">
        <Flex alignItems="center" className="gap-2 px-6 py-4">
          <Icon remixName="ri-folder-line" size={20} />

          <Typography variant="body-m-bold" translate={{ token: "v2.pages.project.overview.projectDetails.title" }} />
        </Flex>

        <ProjectLeads projectId={project.id} projectLeads={projectLeads} />
        <Contributors contributorCount={contributorCount} topContributors={topContributors} />
        <Ecosystems ecosystems={ecosystems} />
        <Categories categories={categories} />
        <Programs programs={programs} />
        <Languages languages={languages} />
        <MoreInfos moreInfos={nonCommunityMoreInfos} />
      </Flex>
    </Card>
  );
}
