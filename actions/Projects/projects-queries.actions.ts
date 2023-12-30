import { BasePaginatedParams, BaseQueriesOptions } from "../type.actions";
import { BaseQueries } from "../base-queries.actions";
import { components } from "../../src/__generated/api";
import { ACTION_PATH } from "../path.actions";
import { ProjectActionTags } from "./projects-tags.actions.ts";

export type ProjectResponse = components["schemas"]["ProjectResponse"];
async function retrieveBySlug(slug: string, options?: BaseQueriesOptions) {
  "use server";

  return BaseQueries<ProjectResponse>(ACTION_PATH.PROJECTS_BY_SLUG(slug), {
    provideTag: [ProjectActionTags.all, ProjectActionTags.by_slug(slug)],
    ...(options || {}),
  });
}

export type ProjectsListResponse = components["schemas"]["ProjectPageResponse"];

export interface ListProjectsParams extends BasePaginatedParams {
  sort?: string;
  mine: boolean;
}
async function listProjects(options?: BaseQueriesOptions<ListProjectsParams>) {
  "use server";

  return BaseQueries<ProjectsListResponse>(ACTION_PATH.PROJECTS, {
    provideTag: [ProjectActionTags.all, ProjectActionTags.list],
    ...(options || {}),
  });
}

export default {
  retrieveBySlug,
  listProjects,
};
