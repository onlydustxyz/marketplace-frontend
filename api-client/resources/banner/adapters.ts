import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

enum Paths {
  get_banner = "get_banner",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  get_banner: {
    url: "banner",
    method: "GET",
  },
};

export default Adapters;
