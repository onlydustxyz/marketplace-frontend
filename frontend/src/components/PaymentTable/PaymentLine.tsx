import { useIntl } from "src/hooks/useIntl";
import { Payment, PaymentStatus } from "src/types";
import onlyDustLogo from "assets/img/onlydust-logo.png";

type PropsType = {
  payment: Payment;
};

const renderPaymentStatus = (paymentStatus: PaymentStatus): React.ReactElement => {
  const { T } = useIntl();

  return (
    <div className="border border-neutral-600 rounded-3xl w-fit p-2">
      {paymentStatus === PaymentStatus.ACCEPTED && (
        <span className="text-green-500">{T("payment.status.completed")}</span>
      )}
      {paymentStatus === PaymentStatus.WAITING_PAYMENT && (
        <span className="text-blue-600">{T("payment.status.processing")}</span>
      )}
    </div>
  );
};

const PaymentLine: React.FC<PropsType> = ({ payment }) => (
  <tr className="border-b border-neutral-600">
    <td className="px-6 py-4">
      <div className="flex flex-row gap-3">
        <div className="border-4 border-neutral-600 p-2 rounded-2xl">
          <img className="w-8 max-w-fit" src={onlyDustLogo} alt="Project Logo" />
        </div>
        <div className="flex flex-col truncate">
          <div className="font-bold text-xl">{payment.project.title}</div>
          <div className="text-lg truncate">{payment.project.description}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-lg">{`${payment.amount.value} ${payment.amount.currency}`} </td>
    <td className="px-6 py-4">{renderPaymentStatus(payment.status)}</td>
  </tr>
);

export default PaymentLine;
