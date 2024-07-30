import { CreateBillingProfileBody } from "core/domain/billing-profile/billing-profile-contract.types";
import { BillingProfileStoragePort } from "core/domain/billing-profile/outputs/biling-profile-storage-port";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class BillingProfileClientAdapter implements BillingProfileStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    createBillingProfile: "billing-profiles",
  } as const;

  createBillingProfile = () => {
    const path = this.routes["createBillingProfile"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: CreateBillingProfileBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };
}
