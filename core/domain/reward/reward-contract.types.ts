import { RewardListItemInterface } from "core/domain/reward/models/reward-list-item-model";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components, operations } from "src/__generated/api";

/* --------------------------------- Get Rewards -------------------------------- */

export type GetRewardsResponse = components["schemas"]["RewardPageResponse"];

export type GetRewardsModel = Omit<GetRewardsResponse, "rewards"> & {
  rewards: RewardListItemInterface[];
};

type GetRewardsQueryParams = operations["getRewards"]["parameters"]["query"]["queryParams"];

export type GetRewardsPortParams = HttpClientParameters<{
  QueryParams: GetRewardsQueryParams;
}>;

export type GetRewardsPortResponse = HttpStorageResponse<GetRewardsModel>;
