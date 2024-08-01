import { BillingProfileStoragePort } from "core/domain/billing-profile/outputs/biling-profile-storage-port";
import { mockHttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class BillingProfileClientAdapterMock implements BillingProfileStoragePort {
  constructor() {}

  routes = {};

  createBillingProfile = mockHttpStorageResponse<BillingProfileStoragePort["createBillingProfile"]>;
}
