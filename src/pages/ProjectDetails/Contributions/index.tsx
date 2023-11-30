import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import Button, { ButtonOnBackground, ButtonSize, Width } from "src/components/Button";
import { withTooltip } from "src/components/Tooltip";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import Title from "src/pages/ProjectDetails/Title";
import { EditProjectButton } from "../components/EditProjectButton";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import { OutletContext } from "../View";

export default function Contributions() {
  const { T } = useIntl();
  const navigate = useNavigate();

  const { project } = useOutletContext<OutletContext>();
  const { slug: projectKey } = project;

  const remainingBudget = project?.remainingUsdBudget;
  const isRewardDisabled = !remainingBudget;
  const orgsWithUnauthorizedRepos = getOrgsWithUnauthorizedRepos(project);
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <Title>{T("project.details.contributions.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="gap-2">
            <EditProjectButton projectKey={projectKey} />
            <Button
              width={Width.Fit}
              size={ButtonSize.Sm}
              disabled={isRewardDisabled}
              onBackground={ButtonOnBackground.Blue}
              onClick={() => {
                return navigate(
                  generatePath(
                    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                    {
                      projectKey,
                    }
                  )
                );
              }}
              {...withTooltip(T("contributor.table.noBudgetLeft"), {
                visible: isRewardDisabled,
              })}
            >
              <span>{T("project.details.remainingBudget.newReward")}</span>
            </Button>
          </Flex>
        ) : null}
      </div>
    </>
  );
}
