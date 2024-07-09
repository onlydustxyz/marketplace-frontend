import { useEffect, useState } from "react";

import { components } from "src/__generated/api";

function mapApiToClass<T>() {
  return class {
    constructor(args: T) {
      Object.assign(this, args);
    }
  } as {
    new (args: T): T;
  };
}

type ShortBillingProfileResponse = Omit<
  components["schemas"]["ShortBillingProfileResponse"],
  "role" | "requestableRewardCount" | "rewardCount" | "invoiceableRewardCount"
>;

type Tokens = {
  default: string;
  fallback: string;
};
interface IShortBillingProfile extends ShortBillingProfileResponse {
  isIndividualLimitReached(amount?: number): boolean;
  token(tokens: Tokens): string;
  formatedPaymentLimit: number | null;
  paymentLimitCounter(amount?: number): {
    currentAmount: number;
    limitedAmount: number | null;
    hasReachedLimit: boolean;
  };
}

class ShortBillingProfile extends mapApiToClass<ShortBillingProfileResponse>() implements IShortBillingProfile {
  constructor(readonly billingProfile: ShortBillingProfileResponse) {
    super(billingProfile);
  }

  isIndividualLimitReached(amount?: number) {
    if (this.individualLimitReached) {
      return this.individualLimitReached;
    }

    if (!this.currentYearPaymentLimit) {
      return false;
    }

    if (amount) {
      return (this.currentYearPaymentAmount || 0) + amount >= this.currentYearPaymentLimit;
    }

    return false;
  }

  get formatedPaymentLimit() {
    if (!this.currentYearPaymentLimit) {
      return null;
    }

    return this.currentYearPaymentLimit > 0 ? this.currentYearPaymentLimit - 1 : this.currentYearPaymentLimit;
  }

  token(tokens: Tokens) {
    if (this.currentYearPaymentLimit) {
      return tokens.default;
    }
    return tokens.fallback;
  }

  paymentLimitCounter(amount?: number) {
    const current = (this.currentYearPaymentAmount || 0) + (amount || 0);
    return {
      currentAmount: current,
      limitedAmount: this.formatedPaymentLimit,
      hasReachedLimit: this.currentYearPaymentLimit ? current >= (this.currentYearPaymentLimit || 0) : false,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInstance = <A, I extends new (args: A) => any>(Instance: I, data?: A): InstanceType<I> | null => {
  const [instance, setInstance] = useState<InstanceType<I> | null>(null);

  useEffect(() => {
    if (data) {
      setInstance(new Instance(data));
    }
  }, [data]);

  return instance;
};

export type { ShortBillingProfileResponse, IShortBillingProfile };
export { ShortBillingProfile };
