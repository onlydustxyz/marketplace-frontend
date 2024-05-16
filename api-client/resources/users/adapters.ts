import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";
import { apiVersions } from "api-client/config/api-versions";
import tags from "api-client/resources/users/tags";

enum Paths {
  root = "root",
  public_profile_by_login = "public_profile_by_login",
  public_profile_by_id = "public_profile_by_id",
  public_ecosystems = "public_ecosystems",
  public_languages = "public_languages",
  public_stats = "public_stats",
  public_contributions = "public_contributions",
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
  public_contributions: {
    url: "users/:githubId/contributions",
    method: "GET",
    version: apiVersions.v2,
  },
};

export default Adapters;
