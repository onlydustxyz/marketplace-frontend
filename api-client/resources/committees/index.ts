import adapters from "./adapters";
import * as fetch from "./fetch";
import * as mutations from "./mutations";
import * as queries from "./queries";
import tags from "./tags";

export const committeeApiClient = {
  adapters,
  fetch,
  mutations,
  queries,
  tags,
};
