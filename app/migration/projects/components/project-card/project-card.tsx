import { components } from "../../../../../src/__generated/api";
import React from "react";
import Card from "../../../../../components/ds/card/card.tsx";
import { isUserProjectLead } from "../../../../../src/utils/isUserProjectLead.ts";
import { cn } from "../../../../../src/utils/cn.ts";

type Props = {
  project: components["schemas"]["ProjectPageItemResponse"];
  isFirstHiringProject?: boolean;
};

export default function ProjectCard({ project, isFirstHiringProject = false }: Props) {
  const {
    id,
    sponsors,
    hiring,
    name = "",
    logoUrl,
    visibility,
    shortDescription,
    contributorCount = 0,
    technologies,
    slug = "",
    leaders = [],
    repoCount = 0,
    isInvitedAsProjectLead,
    isMissingGithubAppInstallation,
  } = project;

  // todo use the retrive user query to get the github user id
  const githubUserId = 123;
  const variant = isUserProjectLead(project, githubUserId) && isMissingGithubAppInstallation ? "default" : "error";
  return (
    <>
      <Card
        className={cn("relative", {
          "bg-noise-light hover:bg-right": variant === "default",
          "border-orange-500 bg-orange-900": variant === "error",
        })}
        border={isInvitedAsProjectLead ? "multiColor" : "medium"}
        dataTestId="project-card"
      ></Card>
    </>
  );
}
