import { BaseQueriesOptions } from "../type.actions";
import { BaseQueries } from "../base-queries.actions";
import { components } from "src/__generated/api";
import { ACTION_PATH } from "../path.actions";
import { ProjectActionTags } from "./projects-tags.actions";

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
