import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import Card from "src/components//Card";
import RoundedImage from "src/components//RoundedImage";
import PayoutStatus from "src/components/PayoutStatus";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import TimeLine from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { pretty } from "src/utils/id";
import { formatMoneyAmount } from "src/utils/money";
import { Payment } from "./Line";
import { ReactNode } from "react";

export default function MobilePayoutList({
  payments,
  payoutInfoMissing,
  invoiceNeeded,
  onPaymentClick,
}: {
  payments: Payment[];
  payoutInfoMissing: boolean;
  invoiceNeeded: boolean;
  onPaymentClick: (payment: Payment) => void;
}) {
  const { T } = useIntl();

  return (
    <div className="flex flex-col gap-4">
      {payments.map(payment => (
        <button onClick={() => onPaymentClick(payment)} key={payment.id}>
          <MobilePaymentItem
            title={payment?.project?.title}
            image={<RoundedImage src={payment?.project?.logoUrl || onlyDustLogo} alt={payment?.project?.title || ""} />}
            request={T("payment.table.paymentRequest", { id: pretty(payment.id), count: payment.workItems.length })}
            amount={formatMoneyAmount({ amount: payment.amount.value, currency: payment.amount.currency })}
            date={payment.requestedAt}
            payoutStatus={
              <PayoutStatus
                {...{
                  id: `payout-status-${payment.id}`,
                  status: payment.status,
                  payoutInfoMissing,
                  invoiceNeeded: invoiceNeeded && !payment.invoiceReceived,
                }}
              />
            }
          />
        </button>
      ))}
    </div>
  );
}

export function MobilePaymentItem({
  image,
  title,
  request,
  amount,
  date,
  payoutStatus,
}: {
  image: ReactNode;
  title: string | undefined;
  request: string;
  amount: string;
  date: Date;
  payoutStatus: ReactNode;
}) {
  const { T } = useIntl();

  return (
    <Card className="flex flex-col gap-3 divide-y divide-greyscale-50/8" selectable>
      <div className="flex flex-col gap-3">
        {payoutStatus}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {image}
            <div className="flex flex-col items-start">
              <div className="font-belwe text-base font-normal">{title}</div>
              <div className="text-sm text-spaceBlue-200">{request}</div>
            </div>
          </div>
          <ArrowRightSLine className="text-xl text-spaceBlue-200" />
        </div>
      </div>

      <div className="flex gap-4 divide-x divide-greyscale-50/8 pt-3 font-walsheim text-sm">
        <div className="flex w-1/2 flex-col items-start">
          <div className="flex items-center gap-1 font-semibold uppercase text-spaceBlue-200">
            <MoneyDollarCircleLine className="text-base font-medium" />
            {T("payment.table.amount")}
          </div>
          {amount}
        </div>

        <div className="flex flex-col items-start pl-4">
          <div className="flex items-center gap-1 font-semibold uppercase text-spaceBlue-200">
            <TimeLine className="text-base font-medium" />
            {T("payment.table.date")}
          </div>
          {displayRelativeDate(date)}
        </div>
      </div>
    </Card>
  );
}
