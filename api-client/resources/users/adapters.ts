import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/users/tags";

enum Paths {
  root = "root",
  public_profile_by_login = "public_profile_by_login",
  public_ecosystems = "public_ecosystems",
  public_languages = "public_languages",
  public_stats = "public_stats",
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
  public_ecosystems: {
    url: "users/:githubId/ecosystems",
    method: "GET",
  },
  public_languages: {
    url: "users/:githubId/languages",
    method: "GET",
  },
  public_stats: {
    url: "users/:githubId/stats",
    method: "GET",
  },
};

export default Adapters;
