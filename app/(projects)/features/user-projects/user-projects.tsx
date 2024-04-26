import { SkeletonEl } from "components/ds/skeleton/skeleton";

import { UseProjectsLead } from "hooks/users/use-projects-lead/use-projects-lead";

import { AddProject } from "./add-project/add-project";
import { MyProjects } from "./my-projects/my-projects";

export function UserProjects() {
  const { projects, isLoading } = UseProjectsLead();

  if (isLoading) {
    return <SkeletonEl variant="rounded" height={135} width="100%" />;
  }

  return projects.length ? <MyProjects projects={projects} /> : <AddProject />;
}
