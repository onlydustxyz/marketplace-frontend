import { components } from "../../../../../src/__generated/api";
import React from "react";
import Card from "@/components/ds/card/card.tsx";
import { isUserProjectLead } from "../../../../../src/utils/isUserProjectLead.ts";
import { cn } from "../../../../../src/utils/cn.ts";
import HiringTag from "./hiring-tag/hiring-tag.tsx";
import Highlights from "./highlights/highlights.tsx";
import Technologies from "./technologies/technologies.tsx";
import Leaders from "./leaders/leaders.tsx";
import Summary from "./summary/summary.tsx";
import ReposCounter from "./repos-counter/repos-counter.tsx";
import ContributorsCounter from "./contributors-counter/contributors-counter.tsx";
import Sponsors from "./sponsors/sponsors.tsx";

type Props = {
  project: components["schemas"]["ProjectPageItemResponse"];
  isFirstHiringProject?: boolean;
};

export default function ProjectItemWrapper({ project, isFirstHiringProject = false }: Props) {
  const { hiring, isInvitedAsProjectLead, isMissingGithubAppInstallation } = project;

  const isPrivate = project.visibility === "PRIVATE"; // TODO move this logic in global utils

  // Todo use the retrieve user me query to get the github user id

  const githubUserId = 123;
  const variant = isUserProjectLead(project, githubUserId) && isMissingGithubAppInstallation ? "error" : "default";
  return (
    <>
      <Card
        className={cn("relative", {
          "bg-noise-light hover:bg-right": variant === "default",
          "border-orange-500 bg-orange-900": variant === "error",
          "mt-3": isFirstHiringProject,
        })}
        border={isInvitedAsProjectLead ? "multiColor" : "medium"}
        dataTestId="project-card"
      >
        <HiringTag isHiring={hiring} variant={variant} />
        <div className="grid grid-cols-[33%_2fr] gap-6 divide-stone-100/8 lg:divide-x">
          <div className="grid-row-2 grid w-full gap-y-5 overflow-hidden">
            <div className="w-full overflow-hidden">
              <Highlights
                name={project.name}
                isPrivate={isPrivate}
                logoUrl={project.logoUrl}
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
      </Card>
    </>
  );
}
