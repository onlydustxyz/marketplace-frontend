import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";

export default {
  get_banner: createTag(apiResources.projects, "get-banner"),
};
