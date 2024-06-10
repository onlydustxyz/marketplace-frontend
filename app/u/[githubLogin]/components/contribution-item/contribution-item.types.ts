import { Contribution } from "src/types";

export namespace TContributionItem {
  interface Project {
    name: string;
    slug: string;
    logoUrl?: string;
  }
  export interface Props {
    project: Project;
    contribution: Contribution;
  }
}
