import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";
import { GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT } from "src/graphql/fragments";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useJwtRole } from "src/hooks/useJwtRole";
import { HasuraUserRole } from "src/types";
import { MyProjectQuery } from "src/__generated/graphql";

export default function MyProjects() {
  const { tokenSet: hasuraToken } = useAuth();
  const { ledProjectIds } = useJwtRole(hasuraToken?.accessToken);
  return (
    <div className="px-10 flex flex-col align-center items-center">
      {ledProjectIds.map((projectId: string) => (
        <Link key={projectId} className="flex w-5/6 my-3" to={`/project/${projectId}`}>
          <MyProjectContainer projectId={projectId} />
        </Link>
      ))}
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
        <Card>
          <ProjectInformation
            name={project.name}
            budget={project?.budgets[0]}
            details={{
              description: project?.projectDetails?.description,
              telegramLink: project?.projectDetails?.telegramLink,
            }}
            githubRepoInfo={{
              owner: project?.githubRepo?.owner,
              name: project?.githubRepo?.name,
              contributors: project?.githubRepo?.content?.contributors,
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
      budgets {
        initialAmount
        remainingAmount
      }
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
