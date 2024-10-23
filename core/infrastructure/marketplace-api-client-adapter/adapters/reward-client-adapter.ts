import { RewardListItem } from "core/domain/reward/models/reward-list-item-model";
import { RewardStoragePort } from "core/domain/reward/outputs/reward-storage-port";
import { GetRewardsResponse } from "core/domain/reward/reward-contract.types";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class RewardClientAdapter implements RewardStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getRewards: "rewards",
  } as const;

  getRewards = ({ queryParams }: FirstParameter<RewardStoragePort["getRewards"]>) => {
    const path = this.routes["getRewards"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });

    const request = async () => {
      const data = await this.client.request<GetRewardsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        rewards: data.rewards.map(reward => new RewardListItem(reward)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
