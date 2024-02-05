import BillingApi from "src/api/me/billing";

import mutations from "./mutations";
import queries from "./queries";
import { ME_TAGS as tags } from "./tags";

const MeApi = {
  tags,
  mutations,
  queries,
  billing: BillingApi,
};

export default MeApi;
