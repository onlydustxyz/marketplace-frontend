import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_projects = "get_projects",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  get_projects: {
    url: "projects",
    method: "GET",
  },
};

export default Adapters;
