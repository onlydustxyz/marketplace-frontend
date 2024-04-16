import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { EditButton } from "./components/edit-button/edit-button";
import { RewardButton } from "./components/reward-button/reward-button";
import { SponsorButton } from "./components/sponsor-button/sponsor-button";
import { TProjectHeader } from "./project-header.types";

// TODO: Review css
export function ProjectHeader({ isProjectLeader, hasOrgsWithUnauthorizedRepos, project }: TProjectHeader.Props) {
  return (
    <Flex className="flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
      <Typography
        variant="title-l"
        translate={{
          token: "project.details.overview.title",
        }}
      />

      {isProjectLeader && !hasOrgsWithUnauthorizedRepos ? (
        <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
          <EditButton slug={project.slug} />
          <RewardButton project={project} />
        </Flex>
      ) : null}

      {!isProjectLeader ? (
        <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
          <SponsorButton project={project} />
        </Flex>
      ) : null}
    </Flex>
  );
}
