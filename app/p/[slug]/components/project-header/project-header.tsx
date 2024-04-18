import { cn } from "src/utils/cn";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { EditButton } from "./components/edit-button/edit-button";
import { RewardButton } from "./components/reward-button/reward-button";
import { SponsorButton } from "./components/sponsor-button/sponsor-button";
import { TProjectHeader } from "./project-header.types";

export function ProjectHeader({ isProjectLeader, hasOrgsWithUnauthorizedRepos, project }: TProjectHeader.Props) {
  return (
    <Flex
      className={cn("justify-between", {
        "flex-col items-start gap-4 md:flex-row md:items-center md:gap-6": isProjectLeader,
        "items-center gap-6": !isProjectLeader,
      })}
    >
      <Typography
        variant="title-l"
        translate={{
          token: "v2.pages.project.overview.title",
        }}
      />

      {isProjectLeader && !hasOrgsWithUnauthorizedRepos ? (
        <Flex alignItems="center" className="gap-2">
          <EditButton slug={project.slug} />
          <RewardButton project={project} />
        </Flex>
      ) : null}

      {!isProjectLeader ? (
        <Flex>
          <SponsorButton project={project} />
        </Flex>
      ) : null}
    </Flex>
  );
}
