import { GetRewardsPortParams, GetRewardsPortResponse } from "core/domain/reward/reward-contract.types";

export interface RewardStoragePort {
  routes: Record<string, string>;
  getRewards(p: GetRewardsPortParams): GetRewardsPortResponse;
}
