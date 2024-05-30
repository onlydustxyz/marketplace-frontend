import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";

import tags from "./tags";

enum Paths {
  root = "root",
  get_projects_by_slug = "get_projects_by_slug",
  get_contributors_by_slug = "get_contributors_by_slug",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  root: {
    url: "ecosystems",
    method: "GET",
    tag: tags.root,
  },
  get_projects_by_slug: {
    url: "ecosystems/:ecosystemSlug/projects",
    method: "GET",
  },
  get_contributors_by_slug: {
    url: "ecosystems/:ecosystemSlug/contributors",
    method: "GET",
  },
};

export default Adapters;
