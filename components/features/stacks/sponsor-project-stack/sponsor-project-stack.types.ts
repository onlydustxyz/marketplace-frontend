import { TUseSearchProjects } from "components/features/search-projects/hooks/use-search-projects.types";

export namespace TSponsorProjectStack {
  export interface Props {
    project?: TUseSearchProjects.Project;
    initialSponsor?: string;
  }
}
