import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";

export default {
  root: createTag(apiResources.applications, "root"),
};
