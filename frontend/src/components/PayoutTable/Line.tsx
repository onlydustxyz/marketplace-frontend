import Line from "../Table/Line";
import Cell from "../Table/Cell";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import RoundedImage from "src/components/RoundedImage";
import PayoutStatus from "../PayoutStatus";
import GithubPRLink, { LinkColor } from "./GithubPRLink";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { Payment } from "src/types";

type Props = {
  payment: Payment;
  payoutInfoMissing: boolean;
};

export default function PaymentLine({ payment, payoutInfoMissing }: Props) {
  return (
    <Line key={payment.id} highlightOnHover={200}>
      <Cell>{displayRelativeDate(payment.requestedAt)}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment?.project?.logoUrl || onlyDustLogo} alt={payment?.project?.title || ""} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-normal text-base font-belwe">{payment?.project?.title}</div>
          {payment.reason && <GithubPRLink link={payment.reason} linkColor={LinkColor.Grey}></GithubPRLink>}
        </div>
      </Cell>
      <Cell>{formatMoneyAmount(payment.amount.value, payment.amount.currency)}</Cell>
      <Cell>
        <PayoutStatus {...{ status: payment.status, payoutInfoMissing }} />
      </Cell>
    </Line>
  );
}
