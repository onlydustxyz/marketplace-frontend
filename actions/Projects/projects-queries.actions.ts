import { components } from "../../src/__generated/api";
import { BaseQueries } from "../base-queries.actions";
import { ACTION_PATH } from "../path.actions";
import { BaseQueriesOptions } from "../type.actions";
import { ProjectActionTags } from "./projects-tags.actions.ts";

export type ProjectResponse = components["schemas"]["ProjectResponse"];
export async function retrieveBySlug(slug: string, options?: BaseQueriesOptions) {
  "use server";
  return BaseQueries<ProjectResponse>(ACTION_PATH.PROJECTS_BY_SLUG(slug), {
    provideTag: [ProjectActionTags.by_slug(slug)],
    ...(options || {}),
  });
}

export default {
  retrieveBySlug,
};
