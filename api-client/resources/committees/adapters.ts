import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  project_application = "project_application",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  project_application: {
    url: "committees/:committee_id/project/applications",
    method: "GET",
  },
};

export default Adapters;
