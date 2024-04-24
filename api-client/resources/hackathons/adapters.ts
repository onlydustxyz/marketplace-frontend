import { FetchAdapaterConstructor } from "api-client/adapter/fetch/fetch-adapter.types";
import tags from "api-client/resources/hackathons/tags";

enum Paths {
  root = "root",
  by_slug = "by_slug",
}

const Adapters: { [key in Paths]: FetchAdapaterConstructor } = {
  root: {
    url: "hackathons",
    methods: "GET",
    tag: tags.root,
  },
  by_slug: {
    url: "hackathons/slug/:slug",
    methods: "GET",
  },
};

export default Adapters;
