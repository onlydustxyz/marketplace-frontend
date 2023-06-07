import Card from "src/components/Card";
import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { useIntl } from "src/hooks/useIntl";
import { useAuth } from "src/hooks/useAuth";
import { useOutletContext } from "react-router-dom";
import Title from "src/pages/ProjectDetails/Title";
import useProjectContributors from "src/hooks/useProjectContributors";
import { useGetProjectDetailsQuery } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";

export default function Contributors() {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const { projectId } = useOutletContext<{ projectId: string }>();

  const isProjectLeader = ledProjectIds.some(element => element === projectId);

  const { contributors } = useProjectContributors(projectId);
  const { data: projectDetails } = useGetProjectDetailsQuery({ variables: { projectId }, ...contextWithCacheHeaders });

  const remainingBudget = projectDetails?.projectsByPk?.budgets.at(0)?.remainingAmount;

  return (
    <>
      <Title>{T("project.details.contributors.title")}</Title>
      {contributors?.length > 0 ? (
        <Card className="h-full">
          <ContributorsTable {...{ contributors, isProjectLeader, remainingBudget, projectId }} />
        </Card>
      ) : (
        <ContributorsTableFallback projectName={projectDetails?.projectsByPk?.projectDetails?.name} />
      )}
    </>
  );
}
