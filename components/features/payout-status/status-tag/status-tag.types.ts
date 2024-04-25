import { TPayoutStatus } from "components/features/payout-status/payout-status.types";

export namespace TStatusTag {
  export interface Props {
    status: TPayoutStatus.PaymentStatusUnion;
    date?: string | null;
    className?: string;
    projectId?: string;
    rewardId?: string;
    billingProfileId?: string;
    shouldOpenRequestPayment?: boolean;
  }
}
