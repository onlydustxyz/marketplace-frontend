import { useIntl } from "src/hooks/useIntl";
import Line from "src/components/Table/Line";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { withTooltip } from "src/components/Tooltip";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import SendPlane2Line from "src/icons/SendPlane2Line";
import { Contributor as ContributorType } from "./View";
import { formatMoneyAmount } from "src/utils/money";
import Contributor from "src/components/Contributor";
import StackLine from "src/icons/StackLine";

type Props = {
  contributor: ContributorType;
  isProjectLeader: boolean;
  isGivingRewardDisabled: boolean;
  onRewardGranted: (contributor: ContributorType) => void;
};

export default function ContributorLine({
  contributor,
  isProjectLeader,
  isGivingRewardDisabled,
  onRewardGranted,
}: Props) {
  const { T } = useIntl();

  return (
    <Line key={contributor.login} className="h-10">
      <Cell height={CellHeight.Small} horizontalMargin={false} className="-ml-px">
        <Contributor contributor={contributor} clickable />
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        {contributor.contributionCount || "-"}
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        {contributor.rewardCount || "-"}
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>{`${contributor?.totalEarned ? formatMoneyAmount({ amount: contributor.totalEarned }) : "-"
        }`}</Cell>
      {isProjectLeader && (
        <Cell height={CellHeight.Small} horizontalMargin={false}>
          {/*  TODO: Uncomment when Code Review availables */}
          {contributor.toRewardCount ? (
            <div
              id="to-reward-count"
              className="flex cursor-default items-center gap-1 rounded-full bg-spacePurple-900 px-1.5 py-1 text-spacePurple-400"
              data-tooltip-id="to-reward-details"
              data-tooltip-content={JSON.stringify({
                unpaidPullRequestCount: contributor.unpaidPullRequestCount,
                unpaidIssueCount: contributor.unpaidIssueCount,
                // unpaidCodeReviewCount: contributor.unpaidCodeReviewCount,
              })}
            >
              <StackLine />

              {/* <span className="font-walsheim font-medium">{contributor.toRewardCount}</span>  */}
              <span className="font-walsheim font-medium">{contributor.toRewardCount - contributor.unpaidCodeReviewCount}</span>
            </div>
          ) : (
            "-"
          )}
        </Cell>
      )}
      {isProjectLeader ? (
        <Cell height={CellHeight.Small} horizontalMargin={false} className="invisible group-hover/line:visible">
          <div {...withTooltip(T("contributor.table.noBudgetLeft"), { visible: isGivingRewardDisabled })}>
            <Button
              type={ButtonType.Secondary}
              size={ButtonSize.Sm}
              disabled={isGivingRewardDisabled}
              onClick={() => onRewardGranted(contributor)}
              data-testid="give-reward-button"
            >
              <SendPlane2Line />
              <div>{T("project.details.contributors.reward")}</div>
            </Button>
          </div>
        </Cell>
      ) : (
        <Cell />
      )}
    </Line>
  );
}
