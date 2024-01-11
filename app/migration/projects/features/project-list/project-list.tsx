import { ProjectCard } from "../../components/project-card/project-card";
import { isUserProjectLead } from "src/utils/isUserProjectLead";
import { ShowMore } from "src/components/Table/ShowMore";
import { useContext } from "react";
import { ProjectsContext } from "../../context/project.context";

export function ProjectList() {
  const { projects, hasNextPage, fetchNextPage, isFetchingNextPage } = useContext(ProjectsContext);

  return (
    <>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} isUserProjectLead={isUserProjectLead(project, githubUserId)} />
      ))}
      {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </>
  );
}
