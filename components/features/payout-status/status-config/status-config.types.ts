import { DateComparisonResult } from "src/utils/date";

import { TPayoutStatus } from "components/features/payout-status/payout-status.types";

export namespace TStatusConfig {
  export interface Props {
    status: TPayoutStatus.PaymentStatusUnion;
    dateRelativeToNow?: DateComparisonResult | undefined;
    date?: string | null;
  }
}
