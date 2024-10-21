import { GetRewardsPortParams, GetRewardsPortResponse } from "core/domain/reward/reward-contract.types";

export interface RewardFacadePort {
  getRewards(p: GetRewardsPortParams): GetRewardsPortResponse;
}
