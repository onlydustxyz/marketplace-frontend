import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/users/tags";

enum Paths {
  root = "root",
  public_profile_by_login = "public_profile_by_login",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  root: {
    url: "users",
    method: "GET",
    tag: tags.root,
  },
  public_profile_by_login: {
    url: "users/login/:githubLogin",
    method: "GET",
  },
};

export default Adapters;
