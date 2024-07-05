import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";

export default {
  get_all_categories: () => createTag(apiResources.projects, "get-all-categories", null),
};
