import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";

import { ShowMore } from "src/components/Table/ShowMore";
import { isUserProjectLead } from "src/utils/isUserProjectLead";

import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.utils";

import { ProjectCard } from "../../components/project-card/project-card";
import { ProjectsContext } from "../../context/project.context";

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
