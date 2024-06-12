import { useContext, useEffect } from "react";

import { ShowMore } from "src/components/Table/ShowMore";
import { usePosthog } from "src/hooks/usePosthog";
import { isUserProjectLead } from "src/utils/isUserProjectLead";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { ProjectCard } from "../../components/project-card/project-card";
import { ProjectsContext } from "../../context/project.context";
import { ProjectListLoading } from "./project-list.loading";

export function ProjectList() {
  const { githubUserId } = useCurrentUser();
  const { capture } = usePosthog();

  const { projects, filters, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useContext(ProjectsContext);

  useEffect(() => {
    capture("project_list_viewed", {
      languages: filters.values.languages.map(({ label }) => label),
      ecosystems: filters.values.ecosystems.map(({ label }) => label),
      tags: filters.values.tags,
    });
  }, [filters]);

  if (isLoading) {
    return <ProjectListLoading />;
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
