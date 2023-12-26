import { BaseQueriesOptions } from "../type.actions";
import { BaseQueries } from "../base-queries.actions";
import { components } from "../../src/__generated/api";
import { ACTION_PATH } from "../path.actions";
import { ProjectActionTags } from "./projects-tags.actions.ts";

export type ProjectResponse = components["schemas"]["ProjectResponse"];
async function retrieveBySlug(slug: string, options?: BaseQueriesOptions) {
  "use server";

  return BaseQueries<ProjectResponse>(ACTION_PATH.PROJECTS_BY_SLUG(slug), {
    revalidate: 60,
    provideTag: [ProjectActionTags.all, ProjectActionTags.by_slug(slug)],
    ...(options || {}),
  });
}

export default {
  retrieveBySlug,
};
