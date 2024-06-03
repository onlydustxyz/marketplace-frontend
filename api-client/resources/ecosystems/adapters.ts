import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";
import { apiVersions } from "api-client/config/api-versions";

import tags from "./tags";

enum Paths {
  root = "root",
  get_by_slug = "get_by_slug",
  get_projects_by_slug = "get_projects_by_slug",
  get_contributors_by_slug = "get_contributors_by_slug",
  get_all = "get_all",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  root: {
    url: "ecosystems",
    method: "GET",
    tag: tags.root,
  },
  get_by_slug: {
    url: "ecosystems/slug/:slug",
    method: "GET",
  },
  get_projects_by_slug: {
    url: "ecosystems/:ecosystemSlug/projects",
    method: "GET",
  },
  get_contributors_by_slug: {
    url: "ecosystems/:ecosystemSlug/contributors",
    method: "GET",
  },
  get_all: {
    url: "ecosystems",
    method: "GET",
    version: apiVersions.v2,
  },
};

export default Adapters;
