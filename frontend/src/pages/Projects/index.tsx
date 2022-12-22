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
      <div className="mx-auto px-10 flex flex-col align-center items-center gap-5 mt-10">
        {data &&
          data.projects.map(project => (
            <Link key={project.id} className="flex w-11/12 my-3" to={`/project/${project.id}`}>
              <Card selectable={true}>
                <ProjectInformation
                  name={project.name}
                  details={{
                    description: project?.projectDetails?.description,
                    telegramLink: project?.projectDetails?.telegramLink,
                    logoUrl: project.projectDetails?.logoUrl || project.githubRepo?.content.logoUrl,
                  }}
                  lead={project?.projectLeads?.[0]?.user}
                  githubRepoInfo={{
                    owner: project?.githubRepo?.owner,
                    name: project?.githubRepo?.name,
                    contributors: project?.githubRepo?.content?.contributors,
                    languages: project?.githubRepo?.languages,
                  }}
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
        logoUrl
      }
      projectLeads {
        user {
          displayName
          avatarUrl
        }
      }
      githubRepo {
        ...GithubRepoFieldsForProjectCard
      }
    }
  }
`;
