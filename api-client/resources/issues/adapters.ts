import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_by_id = "get_by_id",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  get_by_id: {
    url: "issues/:issueId",
    method: "GET",
  },
};

export default Adapters;
