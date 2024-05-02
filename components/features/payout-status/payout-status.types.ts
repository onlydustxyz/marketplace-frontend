import { PaymentStatus } from "src/types";

export namespace TPayoutStatus {
  export interface Props {
    status: PaymentStatusUnion;
    dates?: {
      processedAt?: string | null;
      unlockDate?: string | null;
    };
    projectId?: string;
    rewardId?: string;
    billingProfileId?: string;
    shouldRedirect?: boolean;
    shouldOpenRequestPayment?: boolean;
  }

  export type PaymentStatusUnion = `${PaymentStatus}`;
}
