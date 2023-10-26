import { useIntl } from "src/hooks/useIntl";
import Line from "src/components/Table/Line";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { withTooltip } from "src/components/Tooltip";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import SendPlane2Line from "src/icons/SendPlane2Line";
import { formatMoneyAmount } from "src/utils/money";
import Contributor from "src/components/Contributor";
import StackLine from "src/icons/StackLine";
import { ContributorT } from "src/types";
import { AvailableConversion } from "src/components/Currency/AvailableConversion";

type Props = {
  contributor: ContributorT;
  isProjectLeader: boolean;
  isGivingRewardDisabled: boolean;
  onRewardGranted: (contributor: ContributorT) => void;
};

export default function ContributorLine({
  contributor,
  isProjectLeader,
  isGivingRewardDisabled,
  onRewardGranted,
}: Props) {
  const { T } = useIntl();

  return (
    <Line key={contributor.login} className="group h-10">
      <Cell height={CellHeight.Small} horizontalMargin={false} className="-ml-px">
        <Contributor contributor={contributor} clickable />
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        {contributor.contributionCount || "-"}
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        {contributor.rewardCount || "-"}
      </Cell>
      {/* <Cell height={CellHeight.Small} horizontalMargin={false}>{`${
        contributor?.earned ? formatMoneyAmount({ amount: contributor.earned }) : "-"
      }`}</Cell> */}
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        <div
          className="rounded-full border border-white/8 bg-white/2 px-3 py-[6px]"
          data-tooltip-id={`${contributor.login}-contributors-earned-details`}
        >
          <AvailableConversion
            tooltipId={`${contributor.login}-contributors-earned-details`}
            totalAmount={12000}
            withWrapper
            currencies={[
              {
                currency: "OP",
                amount: 12000,
                dollar: 1200,
              },
              {
                currency: "ETH",
                amount: 12000,
                dollar: 1200,
              },
              {
                currency: "APT",
                amount: 12000,
                dollar: 1200,
              },
            ]}
          />
        </div>
      </Cell>
      {isProjectLeader && (
        <Cell height={CellHeight.Small} horizontalMargin={false}>
          {contributor?.contributionToRewardCount && contributor?.contributionToRewardCount > 0 ? (
            <div
              id="to-reward-count"
              className="flex cursor-default items-center gap-1 rounded-full bg-spacePurple-900 px-1.5 py-1 text-spacePurple-400"
              data-tooltip-id="to-reward-details"
              data-tooltip-content={JSON.stringify({
                unpaidPullRequestCount: contributor.pullRequestToReward,
                unpaidIssueCount: contributor.issueToReward,
                unpaidCodeReviewCount: contributor.codeReviewToReward,
              })}
            >
              <StackLine />

              <span className="font-walsheim font-medium">{contributor.contributionToRewardCount}</span>
            </div>
          ) : (
            "-"
          )}
        </Cell>
      )}
      {isProjectLeader ? (
        <Cell
          height={CellHeight.Small}
          horizontalMargin={false}
          className="invisible flex justify-end group-hover:visible"
          {...withTooltip(T("contributor.table.noBudgetLeft"), { visible: isGivingRewardDisabled })}
        >
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Sm}
            disabled={isGivingRewardDisabled}
            onClick={() => onRewardGranted(contributor)}
            data-testid="give-reward-button"
          >
            <SendPlane2Line />
            {T("project.details.contributors.reward")}
          </Button>
        </Cell>
      ) : (
        <Cell />
      )}
    </Line>
  );
}
