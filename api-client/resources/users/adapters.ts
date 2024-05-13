import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";
import { apiVersions } from "api-client/config/api-versions";
import tags from "api-client/resources/users/tags";

enum Paths {
  root = "root",
  public_profile_by_login = "public_profile_by_login",
  public_profile_by_id = "public_profile_by_id",
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
  public_profile_by_id: {
    url: "users/:githubId",
    method: "GET",
    version: apiVersions.v2,
  },
};

export default Adapters;
