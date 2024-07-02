import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  delete_application = "delete_application",
  accept_application = "accept_application",
  get_all = "get_all",
  get_by_id = "get_by_id",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  delete_application: {
    url: "applications/:applicationId",
    method: "DELETE",
  },
  accept_application: {
    url: "applications/:applicationId/accept",
    method: "POST",
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
