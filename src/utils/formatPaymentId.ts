export function formatPaymentId(paymentId: string) {
  return `#${paymentId.slice(0, 5)}`;
}
