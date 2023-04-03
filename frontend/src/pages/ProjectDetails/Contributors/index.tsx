import Card from "src/components/Card";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { HasuraUserRole } from "src/types";
import {
  GetProjectContributorsDocument,
  GetProjectContributorsQuery,
  GetProjectRemainingBudgetDocument,
  GetProjectRemainingBudgetQuery,
} from "src/__generated/graphql";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useOutletContext } from "react-router-dom";
import { getContributors } from "src/utils/project";
import Title from "src/pages/ProjectDetails/Title";

const Contributors: React.FC = () => {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const { projectId } = useOutletContext<{ projectId: string }>();

  const isProjectLeader = !!ledProjectIds.find(element => element === projectId);

  const getProjectContributorsQuery = useHasuraQuery<GetProjectContributorsQuery>(
    GetProjectContributorsDocument,
    HasuraUserRole.Public,
    {
      variables: { projectId },
    }
  );

  const getProjectRemainingBudget = useHasuraQuery<GetProjectRemainingBudgetQuery>(
    GetProjectRemainingBudgetDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId },
      skip: !isProjectLeader,
    }
  );

  const { contributors } = getContributors(getProjectContributorsQuery.data?.projectsByPk);

  const remainingBudget = getProjectRemainingBudget.data?.projectsByPk?.budgets.at(0)?.remainingAmount;

  return (
    <QueryWrapper query={getProjectContributorsQuery}>
      <Title>{T("project.details.contributors.title")}</Title>
      {contributors.length ? (
        <Card className="h-full">
          <ContributorsTable {...{ contributors, isProjectLeader, remainingBudget, projectId }} />{" "}
        </Card>
      ) : (
        <ContributorsTableFallback projectName={getProjectContributorsQuery.data?.projectsByPk?.projectDetails?.name} />
      )}
    </QueryWrapper>
  );
};

export default Contributors;
