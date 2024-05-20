import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/committees/tags";

enum Paths {
  project_application = "project_application",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  project_application: {
    url: "committees/:committee_id/project/applications",
    method: "GET",
    tag: tags.project_application,
  },
};

export default Adapters;
