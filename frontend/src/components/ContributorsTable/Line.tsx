import { useIntl } from "src/hooks/useIntl";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import Line from "../Table/Line";
import Cell, { CellHeight } from "../Table/Cell";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tooltip from "../Tooltip";
import { linkClickHandlerFactory } from "src/utils/clickHandler";
import Button, { ButtonSize, ButtonType } from "../Button";
import SendPlane2Line from "src/icons/SendPlane2Line";
import { Contributor } from "./View";
import { formatMoneyAmount } from "src/utils/money";
import { Currency } from "src/types";

type Props = {
  contributor: Contributor;
  isProjectLeader: boolean;
  isSendingNewPaymentDisabled: boolean;
  onPaymentRequested: (contributor: Contributor) => void;
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
        <div
          onClick={linkClickHandlerFactory(`https://github.com/${contributor.login}`)}
          className="flex flex-row items-center gap-3 group-hover/line:cursor-pointer"
        >
          <div>
            <RoundedImage
              src={contributor.avatarUrl}
              alt={contributor.login}
              size={ImageSize.Small}
              rounding={Rounding.Circle}
            />
          </div>
          <div className="flex gap-1.5">
            <div>
              <span className="text-spacePurple-200 font-medium group-hover/line:underline decoration-1 underline-offset-1">
                {contributor.login}
              </span>
            </div>
            {contributor.isRegistered && (
              <div className="relative group/od-logo">
                <img src={onlyDustLogo} className="h-3.5 mt-px" />
                <div className="invisible group-hover/od-logo:visible absolute top-5 -left-16 w-36 z-10">
                  <Tooltip>{T("contributor.table.userRegisteredTooltip")}</Tooltip>
                </div>
              </div>
            )}
          </div>
          <div className="ml-1 mt-0.5">
            <ExternalLinkLine className="text-spacePurple-500 invisible group-hover/line:visible" />
          </div>
        </div>
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>{`${
        contributor?.totalEarned ? formatMoneyAmount(contributor.totalEarned, Currency.USD) : "-"
      }`}</Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false}>
        {contributor.paidContributions || "-"}
      </Cell>
      <Cell height={CellHeight.Small} horizontalMargin={false} className="invisible group-hover/line:visible">
        {isProjectLeader && (
          <div
            onClick={() => onPaymentRequested(contributor)}
            className="group/sendPaymentButton relative"
            data-testid="send-payment-button"
          >
            <Button type={ButtonType.Secondary} size={ButtonSize.Small} disabled={isSendingNewPaymentDisabled}>
              <SendPlane2Line />
              <div>{T("project.details.contributors.sendPayment")}</div>
            </Button>
            {isSendingNewPaymentDisabled && (
              <div className="invisible group-hover/sendPaymentButton:visible absolute z-10 w-fit">
                <Tooltip>{T("contributor.table.noBudgetLeft")}</Tooltip>
              </div>
            )}
          </div>
        )}
      </Cell>
    </Line>
  );
}
