import ProjectCard from "../../components/project-card/project-card.tsx";
import { isUserProjectLead } from "src/utils/isUserProjectLead.ts";
import { ShowMore } from "src/components/Table/ShowMore.tsx";
import { useContext } from "react";
import { ProjectsContext } from "../../context/project.context.tsx";

export function ProjectList() {
  const { projects, hasNextPage, fetchNextPage, isFetchingNextPage } = useContext(ProjectsContext);
  const githubUserId = 17259618;

  return (
    <>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} isUserProjectLead={isUserProjectLead(project, githubUserId)} />
      ))}
      {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </>
  );
}

export default ProjectList;
