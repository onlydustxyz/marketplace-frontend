import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import ProjectCard from "src/components/ProjectCard";
import QueryWrapper from "src/components/QueryWrapper";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { buildGithubLink } from "src/utils/stringUtils";

export default function Projects() {
  const query = useHasuraQuery(GET_PROJECTS_QUERY, HasuraUserRole.Public);
  const { data } = query;
  return (
    <QueryWrapper query={query}>
      <div className="px-10 flex flex-col align-center items-center">
        {data?.projects &&
          data.projects.map((project: any) => (
            <Link key={project.id} className="flex w-5/6 my-3" to={`/project/${project.id}`}>
              <ProjectCard
                name={project.name}
                details={project?.projectDetails}
                githubRepoInfo={{
                  contributors: project.githubRepo.contributors,
                  githubLink: buildGithubLink(project.githubRepo.owner, project.githubRepo.name),
                }}
              />
            </Link>
          ))}
      </div>
    </QueryWrapper>
  );
}

export const GET_PROJECTS_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT}
  query MyQuery {
    projects {
      id
      name
      projectDetails {
        description
        telegramLink
      }
      githubRepo {
        ...GithubRepoFieldsForProjectCard
      }
    }
  }
`;
