import { PropsWithChildren } from "react";

import { IssuesWrapper } from "app/(v1)/hackathons/features/issues-wrapper/issues-wrapper";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";

import { TProjectIssues } from "./project-issues.types";

function Wrapper({ children }: PropsWithChildren) {
  return (
    <Paper size={"m"} container={"2"} classNames={{ base: "grid gap-3" }}>
      <div className="flex gap-1">
        <Typo size={"xs"} color={"text-1"} translate={{ token: "v2.features.projectSideOverview.issues" }} />
      </div>
      {children}
    </Paper>
  );
}

export function ProjectIssues({ projectId, hackathonId }: TProjectIssues.Props) {
  return (
    <IssuesWrapper
      projectId={projectId}
      hackathonId={hackathonId}
      queryParams={{ statuses: ["OPEN"] }}
      Wrapper={Wrapper}
    />
  );
}
