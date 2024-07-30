import {
  CreateBillingProfilePortParams,
  CreateBillingProfilePortResponse,
} from "core/domain/billing-profile/billing-profile-contract.types";

export interface BillingProfileFacadePort {
  createBillingProfile(params: CreateBillingProfilePortParams): CreateBillingProfilePortResponse;
}
