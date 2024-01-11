import { ProjectCard } from "../../components/project-card/project-card";
import { isUserProjectLead } from "src/utils/isUserProjectLead";
import { ShowMore } from "src/components/Table/ShowMore";
import { useContext } from "react";
import { ProjectsContext } from "../../context/project.context";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";

export function ProjectList() {
  const { user } = useAuth0();

  const { projects, hasNextPage, fetchNextPage, isFetchingNextPage } = useContext(ProjectsContext);

  const githubUserId = getGithubUserIdFromSub(user?.sub);

  return (
    <>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} isUserProjectLead={isUserProjectLead(project, githubUserId)} />
      ))}
      {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </>
  );
}
