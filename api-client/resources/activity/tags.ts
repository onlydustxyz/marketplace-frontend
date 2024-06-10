import { createTag } from "api-client/config/create-tag";
import { apiResources } from "api-client/config/resources";
import { ActivityAllQueryParams } from "api-client/resources/activity/types";

export default {
  get_all: (queryParams?: ActivityAllQueryParams) => createTag(apiResources.activity, "get-all", null, queryParams),
};
