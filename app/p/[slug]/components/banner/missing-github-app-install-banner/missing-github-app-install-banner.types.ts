import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

export namespace TMissingGithubAppInstallBanner {
  export interface Props {
    slug: string;
    organizations: UseGetProjectBySlugResponse["organizations"];
  }
}
