import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";

export default {
  by_id: (id: string) => createTag(apiResources.issues, "by-id", { id }),
};
