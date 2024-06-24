import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  delete_application = "delete_application",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  delete_application: {
    url: "applications/:applicationId",
    method: "DELETE",
  },
};

export default Adapters;
