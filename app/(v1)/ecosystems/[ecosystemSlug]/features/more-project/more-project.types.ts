import { EcosystemProject } from "api-client/resources/ecosystems/types";

import { TProjectListItem } from "components/ds/project-list-item/project-list-item.types";

export namespace TMoreProject {
  export interface MoreProjectSectionProps {
    ecosystemSlug: string;
    className?: string;
  }
  type TagUnion =
    | "HOT_COMMUNITY"
    | "NEWBIES_WELCOME"
    | "LIKELY_TO_REWARD"
    | "WORK_IN_PROGRESS"
    | "FAST_AND_FURIOUS"
    | "BIG_WHALE"
    | "UPDATED_ROADMAP";
  export interface MoreProjectItemProps {
    project: EcosystemProject;
  }
  export interface MoreProjectProps {
    className?: string;
    projects: TProjectListItem.Project[];
    hasMore: boolean;
    tag: TagUnion;
    ecosystemSlug: string;
  }
}
