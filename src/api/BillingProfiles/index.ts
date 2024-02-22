import mutations from "./mutations";
import { BILLING_PROFILES_PATH as path } from "./path";
import queries from "./queries";
import { BILLING_PROFILES_TAGS as tags } from "./tags";

const BillingProfilesApi = {
  tags,
  mutations,
  queries,
  path,
};

export default BillingProfilesApi;
