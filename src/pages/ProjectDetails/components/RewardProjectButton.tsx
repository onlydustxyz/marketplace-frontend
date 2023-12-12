import { generatePath, useNavigate } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import Button, { ButtonOnBackground, ButtonSize } from "src/components/Button";
import { withTooltip } from "src/components/Tooltip";

import { useIntl } from "src/hooks/useIntl";

type RewardProjectButtonProps = { project: components["schemas"]["ProjectResponse"] };

export function RewardProjectButton({ project }: RewardProjectButtonProps) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const canReward = !!project?.hasRemainingBudget;

  if (!canReward) {
    return (
      <Button
        disabled={canReward}
        onBackground={ButtonOnBackground.Blue}
        className="flex-1 lg:flex-initial"
        size={ButtonSize.Sm}
        onClick={() => console.log("APPLy")}
      >
        {T("project.applyForBudgetButton")}
      </Button>
    );
  }

  return (
    <Button
      disabled={!canReward}
      onBackground={ButtonOnBackground.Blue}
      className="flex-1 lg:flex-initial"
      size={ButtonSize.Sm}
      {...withTooltip(T("contributor.table.noBudgetLeft"), {
        visible: !canReward,
      })}
      onClick={() =>
        navigate(
          generatePath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`, {
            projectKey: project?.slug,
          })
        )
      }
    >
      {T("project.rewardButton.full")}
    </Button>
  );
}
