import { PayoutSettings } from "src/types";

export default function isPayoutInfoMissing(payoutSettings: PayoutSettings | undefined) {
  return !(
    payoutSettings &&
    (payoutSettings?.EthTransfer?.Address ||
      payoutSettings?.EthTransfer?.Name ||
      (payoutSettings?.WireTransfer?.IBAN && payoutSettings?.WireTransfer?.BIC))
  );
}
