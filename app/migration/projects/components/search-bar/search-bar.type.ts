import { ListProjectsParams } from "../../../../../actions/Projects/projects-queries.actions.ts";

export interface ProjectSearchBarProps {
  getProjects(params: ListProjectsParams): Promise<JSX.Element[]>;
}
