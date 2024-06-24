import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  delete_application = "delete_application",
  get_all = "get_all",
  get_by_id = "get_by_id",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  delete_application: {
    url: "applications/:applicationId",
    method: "DELETE",
  },
  get_all: {
    url: "applications",
    method: "GET",
  },
  get_by_id: {
    url: "applications/:applicationId",
    method: "GET",
  },
};

export default Adapters;
