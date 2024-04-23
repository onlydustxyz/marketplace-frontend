import { FetchAdapter } from "api-client/adapter/fetch/fetch-adapter";
import tags from "api-client/resources/hackathons/tags";

export default {
  root: () => new FetchAdapter().setUrl("hackathons").setTags([tags.root]),
  by_slug: () => new FetchAdapter().setUrl("hackathons/slug/:slug").setTags([tags.root]),
};
