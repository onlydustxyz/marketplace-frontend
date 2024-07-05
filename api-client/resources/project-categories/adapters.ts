import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_all_categories = "get_all_categories",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  get_all_categories: {
    url: "project-categories",
    method: "GET",
  },
};

export default Adapters;
