import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_project_application = "get_project_application",
  update_project_application = "update_project_application",
  get_public_committee_by_id = "get_public_committee_by_id",
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
  get_public_committee_by_id: {
    url: "committees/:committee_id",
    method: "GET",
  },
};

export default Adapters;
