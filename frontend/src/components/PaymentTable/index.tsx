import { useIntl } from "src/hooks/useIntl";
import { Currency, PaymentStatus } from "src/types";
import Table from "../Table";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import Headers from "../Table/HeaderLine";
import HeaderCell, { HeaderCellWidth } from "../Table/HeaderCell";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import PayoutStatus from "../PayoutStatus";
import { formatMoneyAmount } from "src/utils/money";
import TimeLine from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";

type PropsType = {
  payments: PaymentRequest[];
};

export interface PaymentRequest {
  id: string;
  recipient: {
    login: string;
    avatarUrl: string;
  };
  amount: {
    value: number;
    currency: Currency;
  };
  reason: string;
  status: PaymentStatus;
  requestedAt: Date;
}

const PaymentTable: React.FC<PropsType> = ({ payments }) => {
  return (
    <Table id="payment_table" headers={renderHeaders()}>
      {renderPayments(payments)}
    </Table>
  );
};

const renderHeaders = () => {
  const { T } = useIntl();
  return (
    <Headers>
      <HeaderCell width={HeaderCellWidth.Sixth} horizontalMargin>
        <TimeLine className="p-px font-normal" />
        <span>{T("payment.table.date")}</span>
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Half} horizontalMargin>
        {T("payment.table.project")}
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} horizontalMargin>
        {T("payment.table.amount")}
      </HeaderCell>
      <HeaderCell width={HeaderCellWidth.Quarter} horizontalMargin>
        {T("payment.table.status")}
      </HeaderCell>
    </Headers>
  );
};

const renderPayments = (payments: PaymentRequest[]) => {
  return payments.map(payment => (
    <Line key={payment.id} highlightOnHover={200}>
      <Cell>{displayRelativeDate(payment.requestedAt)}</Cell>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment.recipient.avatarUrl} alt={payment.recipient.login} size={ImageSize.Large} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-bold text-xl">{payment.recipient.login}</div>
          {payment.reason && <div className="text-lg truncate">{payment.reason}</div>}
        </div>
      </Cell>
      <Cell>{formatMoneyAmount(payment.amount.value, payment.amount.currency)}</Cell>
      <Cell>
        <PayoutStatus {...{ status: payment.status, payoutInfoMissing: false }} />
      </Cell>
    </Line>
  ));
};

export default PaymentTable;
