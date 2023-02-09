import { useIntl } from "src/hooks/useIntl";
import Line from "../Table/Line";
import Cell, { CellHeight } from "../Table/Cell";
import Tooltip from "../Tooltip";
import { linkClickHandlerFactory } from "src/utils/clickHandler";
import Button, { ButtonSize, ButtonType } from "../Button";
import SendPlane2Line from "src/icons/SendPlane2Line";
import { Contributor as ContributorType } from "./View";
import { formatMoneyAmount } from "src/utils/money";
import { Currency } from "src/types";
import Contributor from "src/components/Contributor";

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
    <Line key={contributor.login} highlightOnHover={200} className="h-10">
      <Cell height={CellHeight.Small} horizontalMargin={false} className="-ml-px">
        <Contributor
          contributor={contributor}
          onClick={linkClickHandlerFactory(`https://github.com/${contributor.login}`)}
        />
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>{`${
        contributor?.totalEarned ? formatMoneyAmount(contributor.totalEarned, Currency.USD) : "-"
      }`}</Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        {contributor.paidContributions || "-"}
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false} className="invisible group-hover/line:visible">
        {isProjectLeader && (
          <>
            <Button
              type={ButtonType.Secondary}
              size={ButtonSize.Small}
              disabled={isSendingNewPaymentDisabled}
              onClick={() => onPaymentRequested(contributor)}
              id="sendPaymentButton"
              data-testid="send-payment-button"
            >
              <SendPlane2Line />
              <div>{T("project.details.contributors.sendPayment")}</div>
            </Button>
            {isSendingNewPaymentDisabled && (
              <Tooltip anchorId="sendPaymentButton">{T("contributor.table.noBudgetLeft")}</Tooltip>
            )}
          </>
        )}
      </Cell>
    </Line>
  );
}
