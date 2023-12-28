import { components } from "../../../../../src/__generated/api";
import React from "react";
import Card from "@/components/ds/card/card.tsx";
import { isUserProjectLead } from "../../../../../src/utils/isUserProjectLead.ts";
import { cn } from "../../../../../src/utils/cn.ts";
import HiringTag from "../hiring-tag/hiring-tag.tsx";

type Props = {
  project: components["schemas"]["ProjectPageItemResponse"];
  isFirstHiringProject?: boolean;
};

export default function ProjectCard({ project, isFirstHiringProject = false }: Props) {
  const {
    // id,
    // sponsors,
    hiring,
    // name = "",
    // logoUrl,
    // visibility,
    // shortDescription,
    // contributorCount = 0,
    // technologies,
    // slug = "",
    // leaders = [],
    // repoCount = 0,
    isInvitedAsProjectLead,
    isMissingGithubAppInstallation,
  } = project;

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
        Lorem ipsum dolor
      </Card>
    </>
  );
}
