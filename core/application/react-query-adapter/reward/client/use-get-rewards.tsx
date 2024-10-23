import { useInfiniteQuery } from "@tanstack/react-query";
import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "core/bootstrap";
import { RewardFacadePort } from "core/domain/reward/input/reward-facade-port";
import { GetRewardsModel } from "core/domain/reward/reward-contract.types";

export function useGetRewards({
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<RewardFacadePort["getRewards"], GetRewardsModel>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<RewardFacadePort["getRewards"], GetRewardsModel>({
      queryParams,
      options,
      httpStorage: rewardStoragePort.getRewards,
    })
  );
}
