import { PaymentWithRecipientInfo } from "src/types";
import Line from "../Table/Line";
import Cell, { CellHeight } from "../Table/Cell";
import RoundedImage, { Rounding } from "src/components/RoundedImage";
import PayoutStatus from "../PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import displayRelativeDate from "src/utils/displayRelativeDate";
import GithubPRLink, { LinkColor } from "../PayoutTable/GithubPRLink";
import isPayoutInfoMissing from "src/utils/isPayoutInfoMissing";
import useGithubUser from "src/hooks/useGithubUser";

type Props = {
  payment: PaymentWithRecipientInfo;
};

export default function PaymentLine({ payment }: Props) {
  const payoutInfoMissing = !!isPayoutInfoMissing(payment.recipientPayoutSettings);
  const { data: recipient } = useGithubUser(payment.recipientId);

  return (
    <>
      {payment && recipient && (
        <Line key={payment.id} highlightOnHover={200}>
          <Cell height={CellHeight.Medium}>{displayRelativeDate(payment.requestedAt)}</Cell>
          <Cell height={CellHeight.Medium} className="flex flex-row gap-3">
            <RoundedImage src={recipient.avatarUrl} alt={recipient.login} rounding={Rounding.Circle} />
            <div className="flex flex-col truncate justify-center pb-0.5">
              <div className="font-medium text-sm text-greyscale-50 font-walsheim">{recipient.login}</div>
              {payment.reason && <GithubPRLink link={payment.reason} linkColor={LinkColor.Grey}></GithubPRLink>}
            </div>
          </Cell>
          <Cell height={CellHeight.Medium}>
            <span className="font-walsheim">{formatMoneyAmount(payment.amount.value, payment.amount.currency)}</span>
          </Cell>
          <Cell height={CellHeight.Medium}>
            <PayoutStatus {...{ status: payment.status, payoutInfoMissing }} isProjectLeaderView />
          </Cell>
        </Line>
      )}
    </>
  );
}
