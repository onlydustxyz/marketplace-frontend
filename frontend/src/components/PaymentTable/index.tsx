import { useIntl } from "src/hooks/useIntl";
import { Currency, Payment, PaymentStatus } from "src/types";
import PaymentLine from "./PaymentLine";

type PropsType = {
  payments: Payment[];
};

const PaymentTable: React.FC<PropsType> = ({ payments }) => {
  const { T } = useIntl();
  return (
    <div className="px-4 mx-4">
      <table id="payment_table" className="table-fixed w-full text-white text-sm font-medium font-walsheim">
        <thead className="border-b text-neutral-300 border-neutral-600">
          <tr>
            <th scope="col" className="px-6 py-4 text-left w-1/2">
              {T("payment.table.project")}
            </th>
            <th scope="col" className="px-6 py-4 text-left w-1/4">
              {T("payment.table.amount")}
            </th>
            <th scope="col" className="px-6 py-4 text-left w-1/4">
              {T("payment.table.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <PaymentLine payment={payment} key={payment.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// TODO: replace this any with GraphQL-generated ts types
export const mapApiPaymentsToProps = (apiPayment: any): Payment => {
  const amount = { value: apiPayment.amountInUsd, currency: Currency.USD };
  const project = apiPayment.budget.project;
  const getPaidAmount = (payments: { amount: number }[]) =>
    payments.reduce((total: number, payment: { amount: number }) => total + payment.amount, 0);

  return {
    id: apiPayment.id,
    amount,
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

export default PaymentTable;
