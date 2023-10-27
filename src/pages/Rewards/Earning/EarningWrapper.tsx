import { components } from "src/__generated/api";
import { TotalEarningCard } from "./TotalEarningCard";
import { EarningCard } from "./EarningCard";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import Skeleton from "src/components/Skeleton";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";
import { Currency } from "src/types";

export type EarningAmountType = components["schemas"]["RewardTotalAmountsResponse"];

export function EarningWrapper() {
  const showToaster = useShowToaster();
  const { T } = useIntl();
  const { data, isLoading, isError } = useRestfulData({
    resourcePath: ApiResourcePaths.GET_MY_REWARDS_AMOUNTS,
    method: "GET",
  });

  if (isLoading) {
    return (
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Skeleton variant="earnedRewards" />
        <Skeleton variant="earnedRewards" />
        <Skeleton variant="earnedRewards" />
        <Skeleton variant="earnedRewards" />
        <Skeleton variant="earnedRewards" />
        <Skeleton variant="earnedRewards" />
      </div>
    );
  }

  if (isError) {
    showToaster(T("reward.details.earning.earningsError"), { isError: true });
    return null;
  }

  const { totalAmount, details } = data as EarningAmountType;

  const usdEarnings = details?.find(detail => detail.currency === "USD") || {
    currency: Currency.USD,
    totalAmount: 0,
    totalDollarsEquivalent: 0,
  };
  const etherEarningDetails = details?.find(detail => detail.currency === "ETH") || {
    currency: Currency.ETH,
    totalAmount: 0,
    totalDollarsEquivalent: 0,
  };
  const starkEarnings = details?.find(detail => detail.currency === "STARK") || {
    currency: Currency.STARK,
    totalAmount: 0,
    totalDollarsEquivalent: 0,
  };
  const optimismEarnings = details?.find(detail => detail.currency === "OP") || {
    currency: Currency.OP,
    totalAmount: 0,
    totalDollarsEquivalent: 0,
  };
  const aptosEarnings = details?.find(detail => detail.currency === "APT") || {
    currency: Currency.APT,
    totalAmount: 0,
    totalDollarsEquivalent: 0,
  };

  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-6">
      <TotalEarningCard amount={totalAmount || 0} />
      <EarningCard key={usdEarnings.currency} amount={usdEarnings} />
      <EarningCard key={etherEarningDetails.currency} amount={etherEarningDetails} />
      <EarningCard key={starkEarnings.currency} amount={starkEarnings} />
      <EarningCard key={optimismEarnings.currency} amount={optimismEarnings} />
      <EarningCard key={aptosEarnings.currency} amount={aptosEarnings} />
    </div>
  );
}
