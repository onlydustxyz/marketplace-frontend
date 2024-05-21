import { SkeletonEl } from "components/ds/skeleton/skeleton";

import { useProjectsLead } from "hooks/users/use-projects-lead/use-projects-lead";

import { AddProject } from "./add-project/add-project";
import { MyProjects } from "./my-projects/my-projects";

export function UserProjects() {
  const { projectsLead, pendingProjectsLead, isLoading } = useProjectsLead();

  if (isLoading) {
    return <SkeletonEl variant="rounded" height={135} width="100%" />;
  }

  return projectsLead.length || pendingProjectsLead.length ? (
    <MyProjects projectsLead={projectsLead} pendingProjectsLead={pendingProjectsLead} />
  ) : (
    <AddProject />
  );
}
