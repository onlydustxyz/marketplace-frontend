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
import ProjectLeadInvitationBanner from "@/components/features/project-lead-Invitation-banner/project-lead-Invitation-banner.tsx";
import { useIntl } from "../../../../../src/hooks/useIntl.tsx";
import { ProjectCardProps } from "./project-card.types.ts";

export default function ProjectCard({
  project,
  isFirstHiringProject = false,
  githubAppBanner,
  isUserProjectLead,
}: ProjectCardProps) {
  const { T } = useIntl();
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
      <div className="grid grid-cols-[33%_2fr] gap-6 divide-stone-100/8 lg:divide-x">
        <div className="grid-row-2 grid w-full gap-y-5 overflow-hidden">
          <div className="w-full overflow-hidden">
            <Highlights
              name={project.name}
              isPrivate={isPrivate}
              logoUrl={project.logoUrl}
              // TODO REVAMP THIS COMPONENT
              leaders={<Leaders leaders={project.leaders} />}
            />
          </div>
          <div className="w-full">
            <Technologies technologies={project.technologies} />
          </div>
        </div>
        <div className="w-full lg:pl-6">
          <div className="grid-row-2 grid w-full gap-y-4 overflow-hidden">
            <div className="w-full overflow-hidden">
              <Summary shortDescription={project.shortDescription} />
            </div>
            <div className="flex w-full flex-row flex-wrap gap-1 xl:gap-2">
              <ReposCounter count={project.repoCount} />
              <ContributorsCounter count={project.contributorCount} />
              <Sponsors sponsors={project.sponsors} />
            </div>
          </div>
        </div>
      </div>
      {isInvitedAsProjectLead ? (
        <ProjectLeadInvitationBanner
          projectName={project.name}
          on="cards"
          size={"s"}
          btnLabel={T("project.projectLeadInvitation.view")}
        />
      ) : null}
      {githubAppBanner ? githubAppBanner : null}
    </Card>
  );
}
