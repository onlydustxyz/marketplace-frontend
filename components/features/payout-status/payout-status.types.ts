import { PaymentStatus } from "src/types";
import { DateComparisonResult } from "src/utils/date";

export namespace TPayoutStatus {
  export interface PayoutStatusProps {
    status: PaymentStatusUnion;
    dates?: {
      processedAt?: string | null;
      unlockDate?: string | null;
    };
  }

  export type PaymentStatusUnion = `${PaymentStatus}`;
  export interface StatusConfigProps {
    status: TPayoutStatus.PaymentStatusUnion;
    dateRelativeToNow?: DateComparisonResult | undefined;
    date?: string | null;
  }

  export interface StatusTagProps {
    status: TPayoutStatus.PaymentStatusUnion;
    date?: string | null;
  }
}
