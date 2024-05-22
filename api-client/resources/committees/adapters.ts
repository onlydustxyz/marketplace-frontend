import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_project_application = "get_project_application",
  update_project_application = "update_project_application",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  get_project_application: {
    url: "committees/:committee_id/projects/applications",
    method: "GET",
  },
  update_project_application: {
    url: "committees/:committee_id/projects/:project_id/applications",
    method: "PUT",
  },
};

export default Adapters;
