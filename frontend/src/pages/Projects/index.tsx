import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import QueryWrapper from "src/components/QueryWrapper";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";

export default function Projects() {
  const query = useHasuraQuery<GetProjectsQuery>(GET_PROJECTS_QUERY, HasuraUserRole.Public);
  const { data } = query;
  return (
    <QueryWrapper<GetProjectsQuery> query={query}>
      <div className="px-10 flex flex-col align-center items-center">
        {data &&
          data.projects.map(project => (
            <Link key={project.id} className="flex w-5/6 my-3" to={`/project/${project.id}`}>
              <Card selectable={true}>
                <ProjectInformation
                  name={project.name}
                  details={{
                    description: project?.projectDetails?.description,
                    telegramLink: project?.projectDetails?.telegramLink,
                  }}
                  githubRepoInfo={{ ...project.githubRepo }}
                />
              </Card>
            </Link>
          ))}
      </div>
    </QueryWrapper>
  );
}

export const GET_PROJECTS_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT}
  query GetProjects {
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
