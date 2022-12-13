import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useJwtRole } from "src/hooks/useJwtRole";
import { HasuraUserRole } from "src/types";
import MyProject from "./MyProject";

export default function MyProjects() {
  const { hasuraToken } = useAuth();
  const { ledProjectIds } = useJwtRole(hasuraToken?.accessToken);
  return (
    <>
      <div className="px-10 flex flex-col align-center items-center">
        {ledProjectIds.map((projectId: string) => (
          <Link key={projectId} className="flex w-5/6 my-3" to={`/project/${projectId}`}>
            <MyProjectContainer projectId={projectId} />
          </Link>
        ))}
      </div>
    </>
  );
}

interface MyProjectContainerProps {
  projectId: string;
}

function MyProjectContainer({ projectId }: MyProjectContainerProps) {
  const { data } = useHasuraQuery(GET_MY_PROJECT_QUERY, HasuraUserRole.RegisteredUser, {
    variables: { id: projectId },
  });
  const project = data ? data.projectsByPk : null;
  return (
    <>{project && <MyProject name={project.name} budget={project?.budgets[0]} details={project?.projectDetails} />}</>
  );
}

export const GET_MY_PROJECT_QUERY = gql`
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
    }
  }
`;
