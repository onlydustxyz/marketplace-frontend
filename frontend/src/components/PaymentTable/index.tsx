import { useIntl } from "src/hooks/useIntl";
import { Currency, Payment, PaymentStatus } from "src/types";
import PaymentLine from "./PaymentLine";

type PropsType = {
  payments: Payment[];
};

const PaymentTable: React.FC<PropsType> = ({ payments }) => {
  const { T } = useIntl();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-white text-sm font-medium">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left">
                    {T("payment.table.project")}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
                    {T("payment.table.amount")}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left">
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
        </div>
      </div>
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
    },
    status:
      getPaidAmount(apiPayment.payments) === apiPayment.amountInUsd
        ? PaymentStatus.ACCEPTED
        : PaymentStatus.WAITING_PAYMENT,
  };
};

export default PaymentTable;
