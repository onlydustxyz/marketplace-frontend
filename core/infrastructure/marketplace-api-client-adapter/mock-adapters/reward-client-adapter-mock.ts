import { RewardStoragePort } from "core/domain/reward/outputs/reward-storage-port";
import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class RewardClientAdapterMock implements RewardStoragePort {
  constructor() {}

  routes = {};

  getRewards = mockHttpStorageResponse<RewardStoragePort["getRewards"]>;
}
