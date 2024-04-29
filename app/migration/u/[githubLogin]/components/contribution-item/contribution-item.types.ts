import { PropsWithChildren } from "react";

export namespace TContributionItem {
  interface Project {
    name: string;
    slug: string;
    logoUrl: string;
  }
  export interface Props {
    project: Project;
    githubLink: string;
  }
}
