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

// TODO WHEN BACKEND MODEL AS SAME FIELD IN Short and Long remove omit
type ShortBillingProfileResponse = Omit<
  components["schemas"]["ShortBillingProfileResponse"],
  "role" | "requestableRewardCount" | "rewardCount" | "invoiceableRewardCount"
>;

interface IShortBillingProfile extends ShortBillingProfileResponse {
  isIndividualLimitReached(): boolean;
  getLimitAmount(): number | null;
  getCurrentYearPaymentAmount(): number;
  getCurrentProgressionAmount(amount: number): number;
  getHasReachedProgressionLimit(amount: number): boolean;
}

// TODO : How can we instance a longBillingProfile with the ShortBillingMethods
class ShortBillingProfile extends mapApiToClass<ShortBillingProfileResponse>() implements IShortBillingProfile {
  constructor(readonly billingProfile: ShortBillingProfileResponse) {
    super(billingProfile);
  }

  isIndividualLimitReached() {
    return this.individualLimitReached || false;
  }

  getLimitAmount() {
    if (!this.currentYearPaymentLimit) {
      return null;
    }

    return this.currentYearPaymentLimit > 0 ? this.currentYearPaymentLimit - 1 : this.currentYearPaymentLimit;
  }

  getCurrentYearPaymentAmount() {
    return this.currentYearPaymentAmount || 0;
  }

  getCurrentProgressionAmount(amount: number = 0) {
    return this.getCurrentYearPaymentAmount() + amount;
  }

  getHasReachedProgressionLimit(amount: number = 0) {
    if (!this?.currentYearPaymentLimit) {
      return false;
    }

    return this.getCurrentProgressionAmount(amount) >= this.currentYearPaymentLimit;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useClientInstance = <A, I extends new (args: A) => any>(Instance: I, data?: A): InstanceType<I> | null => {
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
