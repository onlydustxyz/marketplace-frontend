import {
  CreateBillingProfilePortParams,
  CreateBillingProfilePortResponse,
} from "core/domain/billing-profile/billing-profile-contract.types";

export interface BillingProfileStoragePort {
  routes: Record<string, string>;
  createBillingProfile(params: CreateBillingProfilePortParams): CreateBillingProfilePortResponse;
}
