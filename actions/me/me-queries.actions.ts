import { BaseQueries } from "actions/base-queries.actions";
import { MeActionTags } from "actions/me/me-tags.actions";
import { ACTION_PATH } from "actions/path.actions";
import { BaseQueriesOptions } from "actions/type.actions";

import { components } from "src/__generated/api";

export type MeInformations = components["schemas"]["GetMeResponse"];
export async function retrieveMeInformations(options?: BaseQueriesOptions) {
  return BaseQueries<MeInformations>(ACTION_PATH.ME, {
    provideTag: [MeActionTags.user()],
    ...(options || {}),
  });
}

export default {
  retrieveMeInformations,
};
