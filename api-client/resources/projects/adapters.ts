import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_all = "get_all",
  get_all_categories = "get_all_categories",
  get_project_issues = "get_project_issues",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  get_all: {
    url: "projects",
    method: "GET",
  },
  get_all_categories: {
    url: "project-categories",
    method: "GET",
  },
  get_project_issues: {
    url: "projects/:projectId/issues",
    method: "GET",
  },
};

export default Adapters;
