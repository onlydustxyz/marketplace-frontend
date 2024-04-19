import { BaseQueries } from "actions/base-queries.actions";
import { HACKATHONS_ACTION_PATH } from "actions/billing-profiles/hackathons-path.actions";
import { BaseQueriesOptions } from "actions/type.actions";

import { components } from "src/__generated/api";

import { HackathonsActionTags } from "./hackathons-tags.actions";

export type HackathonsListResponse = components["schemas"]["HackathonsListResponse"];
export async function getHackathonsList(options?: BaseQueriesOptions) {
  return BaseQueries<HackathonsListResponse>(HACKATHONS_ACTION_PATH.ROOT, {
    provideTag: [HackathonsActionTags.hackathons_list],
    ...(options || {}),
  });
}

export type HackathonsBySlugResponse = components["schemas"]["HackathonsDetailsResponse"];
export async function getHackathonsBySlug(slug: string, options?: BaseQueriesOptions) {
  return BaseQueries<HackathonsBySlugResponse>(HACKATHONS_ACTION_PATH.BY_SLUG(slug), {
    provideTag: [HackathonsActionTags.hackathons_by_slug(slug)],
    ...(options || {}),
  });
}

export default {
  getHackathonsList,
  getHackathonsBySlug,
};
