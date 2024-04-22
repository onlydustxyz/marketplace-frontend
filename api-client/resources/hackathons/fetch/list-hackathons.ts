import { BaseQueries } from "actions/base-queries.actions";
import { BaseQueriesOptions } from "actions/type.actions";
import { ListHackathonsResponse } from "api-client/resources/hackathons/types";

import paths from "../paths";
import tags from "../tags";

export async function getHackathonsList(options?: BaseQueriesOptions) {
  return BaseQueries<ListHackathonsResponse>(paths.root, {
    provideTag: [tags.fetch.root],
    ...(options || {}),
  });
}
