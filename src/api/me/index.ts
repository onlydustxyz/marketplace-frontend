import BillingApi from "src/api/me/billing";

import mutations from "./mutations";
import { ME_PATH as path } from "./path";
import queries from "./queries";
import { ME_TAGS as tags } from "./tags";

const MeApi = {
  tags,
  mutations,
  queries,
  billing: BillingApi,
  path,
};

export default MeApi;
