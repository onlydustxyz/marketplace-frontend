import { useCurrentUser } from "hooks/users/useCurrentUser";
import { useContext } from "react";

import { ProjectCardLoading } from "app/migration/projects/components/project-card/project-card.loading";
import { ProjectsContext } from "app/migration/projects/context/project.context";

import { ShowMore } from "src/components/Table/ShowMore";
import { isUserProjectLead } from "src/utils/isUserProjectLead";

import { ProjectCard } from "../../components/project-card/project-card";

export function ProjectList() {
  const { githubUserId } = useCurrentUser();

  const { projects, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useContext(ProjectsContext);

  if (isLoading) {
    return (
      <>
        <ProjectCardLoading />
        <ProjectCardLoading />
        <ProjectCardLoading />
        <ProjectCardLoading />
      </>
    );
  }

  return (
    <>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} isUserProjectLead={isUserProjectLead(project, githubUserId)} />
      ))}
      {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </>
  );
}
