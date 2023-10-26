import { components } from "src/__generated/api";
import { TotalEarningCard } from "./TotalEarningCard";
import { EarningCard } from "./EarningCard";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import Skeleton from "src/components/Skeleton";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";

export type EarningAmountType = components["schemas"]["MyRewardTotalAmountsResponse"];

export function EarningWrapper() {
  const showToaster = useShowToaster();
  const { T } = useIntl();
  const { data, isLoading, isError } = useRestfulData({
    resourcePath: ApiResourcePaths.GET_MY_REWARDS_AMOUNTS,
    method: "GET",
  });

  if (isLoading) {
    return (
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton variant="earnedRewards" />
        <Skeleton variant="earnedRewards" />
      </div>
    );
  }

  if (isError) {
    showToaster(T("reward.details.earning.error"));
    return null;
  }

  const { totalAmount, details } = data as EarningAmountType;

  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TotalEarningCard amount={totalAmount || 0} />

      {details?.map(amount => {
        return <EarningCard key={amount.currency} amount={amount} />;
      })}
    </div>
  );
}
