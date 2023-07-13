import ContributorsTableFallback from "src/components/ContributorsTableFallback";
import ContributorsTable from "src/pages/ProjectDetails/Contributors/ContributorsTable";
import { useIntl } from "src/hooks/useIntl";
import { useAuth } from "src/hooks/useAuth";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import Title from "src/pages/ProjectDetails/Title";
import useProjectContributors from "src/hooks/useProjectContributors";
import { useGetProjectDetailsQuery } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import Button, { ButtonSize } from "src/components/Button";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";

export default function Contributors() {
  const { T } = useIntl();
  const { ledProjectIds } = useAuth();
  const navigate = useNavigate();
  const { projectId, projectKey } = useOutletContext<{ projectId: string; projectKey: string }>();

  const isProjectLeader = ledProjectIds.includes(projectId);

  const { contributors } = useProjectContributors(projectId);
  const { data: projectDetails } = useGetProjectDetailsQuery({ variables: { projectId }, ...contextWithCacheHeaders });

  const remainingBudget = projectDetails?.projects[0]?.budgets.at(0)?.remainingAmount;

  return (
    <>
      <Title>
        <div className="flex flex-row items-center justify-between">
          {T("project.details.contributors.title")}
          {isProjectLeader && (
            <Button
              size={ButtonSize.Sm}
              onClick={() =>
                navigate(
                  generatePath(
                    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                    {
                      projectKey,
                    }
                  )
                )
              }
            >
              {T("project.rewardContributorButton")}
            </Button>
          )}
        </div>
      </Title>
      <ProjectLeadInvitation projectId={projectId} />
      {contributors?.length > 0 ? (
        <ContributorsTable {...{ contributors, isProjectLeader, remainingBudget, projectId, projectKey }} />
      ) : (
        <ContributorsTableFallback projectName={projectDetails?.projects[0]?.name} />
      )}
    </>
  );
}
