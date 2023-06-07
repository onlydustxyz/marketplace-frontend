import Card from "src/components/Card";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { useIntl } from "src/hooks/useIntl";
import {
  GetProjectContributorsAsLeaderDocument,
  GetProjectContributorsDocument,
  useGetProjectRemainingBudgetQuery,
} from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { useOutletContext } from "react-router-dom";
import { getContributors } from "src/utils/project";
import Title from "src/pages/ProjectDetails/Title";
import { contextWithCacheHeaders } from "src/utils/headers";
import { useSuspenseQuery_experimental } from "@apollo/client";

export default function Contributors() {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const { projectId } = useOutletContext<{ projectId: string }>();

  const isProjectLeader = !!ledProjectIds.find(element => element === projectId);

  const getProjectContributorsQuery = useSuspenseQuery_experimental(
    isProjectLeader ? GetProjectContributorsAsLeaderDocument : GetProjectContributorsDocument,
    {
      variables: { projectId },
      ...contextWithCacheHeaders,
    }
  );

  const getProjectRemainingBudget = useGetProjectRemainingBudgetQuery({
    variables: { projectId },
    skip: !isProjectLeader,
  });

  const contributors = getContributors(getProjectContributorsQuery.data?.projectsByPk);

  const remainingBudget = getProjectRemainingBudget.data?.projectsByPk?.budgets.at(0)?.remainingAmount;

  return (
    <>
      <Title>{T("project.details.contributors.title")}</Title>
      {contributors?.length > 0 ? (
        <Card className="h-full">
          <ContributorsTable {...{ contributors, isProjectLeader, remainingBudget, projectId }} />
        </Card>
      ) : (
        <ContributorsTableFallback projectName={getProjectContributorsQuery.data?.projectsByPk?.projectDetails?.name} />
      )}
    </>
  );
}
