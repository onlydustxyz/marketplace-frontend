import { PaymentStatus } from "src/types";

export namespace TPayoutStatus {
  export interface Props {
    status: PaymentStatusUnion;
    dates?: {
      processedAt?: string | null;
      unlockDate?: string | null;
    };
    projectId?: string;
  }

  export type PaymentStatusUnion = `${PaymentStatus}`;
}
