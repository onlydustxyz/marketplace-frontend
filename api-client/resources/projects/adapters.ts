import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_all = "get_all",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  get_all: {
    url: "projects",
    method: "GET",
  },
};

export default Adapters;
