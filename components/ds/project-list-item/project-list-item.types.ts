import { components } from "src/__generated/api";

export namespace TProjectListItem {
  export type Project = Pick<
    components["schemas"]["ProjectPageItemResponse"],
    "id" | "name" | "slug" | "shortDescription" | "logoUrl"
  >;
  export interface Props {
    project: Project;
  }
}
