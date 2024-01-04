import React from "react";
import Card from "@/components/ds/card/card.tsx";
import { cn } from "../../../../../src/utils/cn.ts";
import HiringTag from "./hiring-tag/hiring-tag.tsx";
import Highlights from "./highlights/highlights.tsx";
import Technologies from "./technologies/technologies.tsx";
import Leaders from "./leaders/leaders.tsx";
import Summary from "./summary/summary.tsx";
import ReposCounter from "./repos-counter/repos-counter.tsx";
import ContributorsCounter from "./contributors-counter/contributors-counter.tsx";
import Sponsors from "./sponsors/sponsors.tsx";
import { ProjectCardProps } from "./project-card.types.ts";
import { Flex } from "@/components/layout/flex/flex.tsx";

export default function ProjectCard({
  project,
  isFirstHiringProject = false,
  githubAppBanner,
  isUserProjectLead,
  invitedBanner,
}: ProjectCardProps) {
  const { hiring, isInvitedAsProjectLead, isMissingGithubAppInstallation } = project;
  const isErrorVariant = Boolean(isUserProjectLead && isMissingGithubAppInstallation);
  const isPrivate = project.visibility === "PRIVATE"; // TODO move this logic in global utils

  return (
    <Card
      className={cn("relative", {
        "bg-noise-light hover:bg-right": !isErrorVariant,
        "border-orange-500 bg-orange-900": isErrorVariant,
        "mt-3": isFirstHiringProject,
      })}
      border={isInvitedAsProjectLead ? "multiColor" : "medium"}
      dataTestId="project-card"
    >
      <HiringTag isHiring={hiring} isErrorVariant={isErrorVariant} />
      <Flex direction="col" className="gap-5">
        <Flex direction="row" className="items-stretch gap-6 divide-stone-100/8 lg:divide-x">
          <Flex direction="col" className="min-w-0 basis-1/3 gap-y-5">
            <Highlights
              name={project.name}
              isPrivate={isPrivate}
              logoUrl={project.logoUrl}
              // TODO REVAMP THIS COMPONENT
              leaders={<Leaders leaders={project.leaders} />}
            />
            <Technologies technologies={project.technologies} />
          </Flex>
          <Flex direction="col" className="basis-2/3 items-stretch justify-center gap-4 lg:gap-4 lg:pl-6">
            <Summary shortDescription={project.shortDescription} />
            <Flex direction="col" className="w-full flex-row flex-wrap gap-1 xl:gap-2">
              <ReposCounter count={project.repoCount} />
              <ContributorsCounter count={project.contributorCount} />
              <Sponsors sponsors={project.sponsors} />
            </Flex>
          </Flex>
        </Flex>
        {invitedBanner ? invitedBanner : null}
        {githubAppBanner ? githubAppBanner : null}
      </Flex>
    </Card>
  );
}
