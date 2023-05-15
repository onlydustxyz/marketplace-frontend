import { useIntl } from "src/hooks/useIntl";
import Line from "src/components/Table/Line";
import Cell, { CellHeight } from "src/components/Table/Cell";
import Tooltip from "src/components/Tooltip";
import { linkClickHandlerFactory } from "src/utils/clickHandler";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import SendPlane2Line from "src/icons/SendPlane2Line";
import { Contributor as ContributorType } from "./View";
import { formatMoneyAmount } from "src/utils/money";
import Contributor from "src/components/Contributor";
import Badge, { BadgeIcon, BadgeSize } from "src/components/Badge";

type Props = {
  contributor: ContributorType;
  isProjectLeader: boolean;
  isSendingNewPaymentDisabled: boolean;
  onPaymentRequested: (contributor: ContributorType) => void;
};

export default function ContributorLine({
  contributor,
  isProjectLeader,
  isSendingNewPaymentDisabled,
  onPaymentRequested,
}: Props) {
  const { T } = useIntl();

  return (
    <Line key={contributor.login} className="h-10">
      <Cell height={CellHeight.Small} horizontalMargin={false} className="-ml-px">
        <Contributor contributor={contributor} onClick={linkClickHandlerFactory(contributor.htmlUrl)} />
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>{`${
        contributor?.totalEarned ? formatMoneyAmount({ amount: contributor.totalEarned }) : "-"
      }`}</Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        {contributor.paidContributions || "-"}
      </Cell>
      {isProjectLeader ? (
        <>
          <Cell height={CellHeight.Small} horizontalMargin={false}>
            {contributor.unpaidMergedPullsCount ? (
              <>
                <Badge
                  id={`pr-count-badge-${contributor.login}`}
                  size={BadgeSize.Small}
                  icon={BadgeIcon.GitMerge}
                  value={contributor.unpaidMergedPullsCount}
                />
                <Tooltip anchorId={`pr-count-badge-${contributor.login}`}>
                  {T("payment.form.contributor.unpaidMergedPrCountTooltip")}
                </Tooltip>
              </>
            ) : (
              "-"
            )}
          </Cell>
          <Cell height={CellHeight.Small} horizontalMargin={false} className="invisible group-hover/line:visible">
            <div id={`sendPaymentButton-${contributor.login}`}>
              <Button
                type={ButtonType.Secondary}
                size={ButtonSize.Sm}
                disabled={isSendingNewPaymentDisabled}
                onClick={() => onPaymentRequested(contributor)}
                data-testid="send-payment-button"
              >
                <SendPlane2Line />
                <div>{T("project.details.contributors.sendPayment")}</div>
              </Button>
            </div>
            {isSendingNewPaymentDisabled && (
              <Tooltip anchorId={`sendPaymentButton-${contributor.login}`}>
                {T("contributor.table.noBudgetLeft")}
              </Tooltip>
            )}
          </Cell>
        </>
      ) : (
        <Cell />
      )}
    </Line>
  );
}
