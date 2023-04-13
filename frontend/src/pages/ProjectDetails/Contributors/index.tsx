import Card from "src/components/Card";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useIntl } from "src/hooks/useIntl";
import { HasuraUserRole } from "src/types";
import {
  GetProjectContributorsAsLeaderDocument,
  GetProjectContributorsAsLeaderQuery,
  GetProjectContributorsDocument,
  GetProjectContributorsQuery,
  GetProjectRemainingBudgetDocument,
  GetProjectRemainingBudgetQuery,
} from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { useOutletContext } from "react-router-dom";
import { getContributors } from "src/utils/project";
import Title from "src/pages/ProjectDetails/Title";
import { Suspense } from "react";
import { useMemo } from "react";
import { daysFromNow } from "src/utils/date";
import { SEARCH_MAX_DAYS_COUNT } from "src/pages/ProjectDetails/Payments/PaymentForm";

export default function Contributors() {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const { projectId } = useOutletContext<{ projectId: string }>();

  const isProjectLeader = !!ledProjectIds.find(element => element === projectId);

  const getProjectContributorsQueryAsPublic = useHasuraQuery<GetProjectContributorsQuery>(
    GetProjectContributorsDocument,
    HasuraUserRole.Public,
    {
      variables: { projectId },
      skip: isProjectLeader,
    }
  );

  const createdSince = useMemo(() => daysFromNow(SEARCH_MAX_DAYS_COUNT), []);

  const getProjectContributorsQueryAsLeader = useHasuraQuery<GetProjectContributorsAsLeaderQuery>(
    GetProjectContributorsAsLeaderDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: { projectId, createdSince },
      skip: !isProjectLeader,
    }
  );

  const getProjectContributorsQuery = isProjectLeader
    ? getProjectContributorsQueryAsLeader
    : getProjectContributorsQueryAsPublic;

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
    <>
      <Title>{T("project.details.contributors.title")}</Title>
      <Suspense fallback={<div />}>
        {contributors?.length > 0 && (
          <Card className="h-full">
            <ContributorsTable {...{ contributors, isProjectLeader, remainingBudget, projectId }} />
          </Card>
        )}
        {!contributors.length && !getProjectContributorsQuery.loading && (
          <ContributorsTableFallback
            projectName={getProjectContributorsQuery.data?.projectsByPk?.projectDetails?.name}
          />
        )}
      </Suspense>
    </>
  );
}
