import { useIntl } from "src/hooks/useIntl";
import { PaymentStatus } from "src/types";
import Table from "../Table";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import Headers from "../Table/HeaderLine";
import HeaderCell from "../Table/HeaderCell";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";

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
    currency: string;
  };
  reason: string;
  status: PaymentStatus;
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
      <HeaderCell className="w-1/2">{T("payment.table.project")}</HeaderCell>
      <HeaderCell className="w-1/4">{T("payment.table.amount")}</HeaderCell>
      <HeaderCell className="w-1/4">{T("payment.table.status")}</HeaderCell>
    </Headers>
  );
};

const renderPayments = (payments: PaymentRequest[]) => {
  const { T } = useIntl();

  return payments.map(payment => (
    <Line key={payment.id}>
      <Cell className="flex flex-row gap-3">
        <RoundedImage src={payment.recipient.avatarUrl} alt={payment.recipient.login} size={ImageSize.Medium} />
        <div className="flex flex-col truncate justify-center">
          <div className="font-bold text-xl">{payment.recipient.login}</div>
          {payment.reason && <div className="text-lg truncate">{payment.reason}</div>}
        </div>
      </Cell>
      <Cell>{`${payment.amount.value} ${payment.amount.currency}`}</Cell>
      <Cell>
        <div className="border border-neutral-600 rounded-3xl w-fit p-2">
          {payment.status === PaymentStatus.ACCEPTED && (
            <span className="text-green-500">{T("payment.status.completed")}</span>
          )}
          {payment.status === PaymentStatus.WAITING_PAYMENT && (
            <span className="text-blue-600">{T("payment.status.processing")}</span>
          )}
        </div>
      </Cell>
    </Line>
  ));
};

export default PaymentTable;
