import { gql } from "@apollo/client";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { MyProjectQuery } from "src/__generated/graphql";
import { useT } from "talkr";

export default function MyProjects() {
  const { T } = useT();
  const { ledProjectIds } = useAuth();
  return (
    <div className="bg-space">
      <div className="container mx-auto pt-16 min-h-screen">
        <div className="text-5xl font-alfreda">{T("navbar.myProjects")}</div>
        <div className="px-10 flex flex-col align-center items-center gap-5 mt-10">
          {ledProjectIds.map((projectId: string) => (
            <Link
              key={projectId}
              className="flex w-11/12 my-3"
              to={generatePath(RoutePaths.MyProjectDetails, { projectId })}
            >
              <MyProjectContainer projectId={projectId} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

interface MyProjectContainerProps {
  projectId: string;
}

function MyProjectContainer({ projectId }: MyProjectContainerProps) {
  const query = useHasuraQuery<MyProjectQuery>(GET_MY_PROJECT_QUERY, HasuraUserRole.RegisteredUser, {
    variables: { id: projectId },
  });
  const project = query.data?.projectsByPk;
  return (
    <>
      {project && (
        <Card selectable>
          <ProjectInformation
            name={project.name}
            details={{
              description: project?.projectDetails?.description,
              telegramLink: project?.projectDetails?.telegramLink,
              logoUrl: project?.projectDetails?.logoUrl || project?.githubRepo?.content?.logoUrl,
            }}
            githubRepoInfo={{
              owner: project?.githubRepo?.owner,
              name: project?.githubRepo?.name,
              contributors: project?.githubRepo?.content?.contributors,
              languages: project?.githubRepo?.languages,
            }}
          />
        </Card>
      )}
    </>
  );
}

export const GET_MY_PROJECT_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT}
  query MyProject($id: uuid!) {
    projectsByPk(id: $id) {
      name
      projectDetails {
        description
        telegramLink
        logoUrl
      }
      githubRepo {
        ...GithubRepoFieldsForProjectCard
      }
    }
  }
`;
