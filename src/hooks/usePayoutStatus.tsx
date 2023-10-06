import usePayoutSettings from "src/hooks/usePayoutSettings";
import { PaymentStatus, Reward } from "src/types";

export function usePayoutStatus(reward: Reward) {
  const {
    paymentRequest: { amount, invoiceReceivedAt, paymentsAggregate, recipientId },
  } = reward;

  const { valid } = usePayoutSettings(recipientId);

  const paidAmount = paymentsAggregate.aggregate.sum.amount;
  const status = paidAmount === amount ? PaymentStatus.ACCEPTED : PaymentStatus.WAITING_PAYMENT;
  const invoiceReceived = Boolean(invoiceReceivedAt);

  return {
    status,
    payoutInfoMissing: !valid,
    invoiceNeeded: !invoiceReceived,
  };
}
