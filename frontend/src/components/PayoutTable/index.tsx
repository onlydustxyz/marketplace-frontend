import { useIntl } from "src/hooks/useIntl";
import { Currency, Payment, PaymentStatus } from "src/types";
import Table from "../Table";
import Line from "../Table/Line";
import Cell from "../Table/Cell";
import Headers from "../Table/HeaderLine";
import HeaderCell from "../Table/HeaderCell";
import onlyDustLogo from "assets/img/onlydust-logo.png";

type PropsType = {
  payments: Payment[];
};

const PayoutTable: React.FC<PropsType> = ({ payments }) => {
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

const renderPayments = (payments: Payment[]) => {
  const { T } = useIntl();

  return payments.map(payment => (
    <Line key={payment.id}>
      <Cell className="flex flex-row gap-3">
        <div className="border-4 border-neutral-600 p-2 rounded-2xl">
          <img className="w-8 max-w-fit" src={payment.project.logoUrl || onlyDustLogo} alt="Project Logo" />
        </div>
        <div className="flex flex-col truncate justify-center">
          <div className="font-bold text-xl">{payment.project.title}</div>
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

// TODO: replace this any with GraphQL-generated ts types
export const mapApiPaymentsToProps = (apiPayment: any): Payment => {
  const amount = { value: apiPayment.amountInUsd, currency: Currency.USD };
  const project = apiPayment.budget.project;
  const reason = apiPayment.reason?.work_items?.at(0);
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    amount,
    reason,
    project: {
      id: project.id,
      title: project.name,
      description: project.projectDetails.description,
      logoUrl: project.projectDetails.logoUrl || project.githubRepo?.content?.logoUrl,
    },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export default PayoutTable;
