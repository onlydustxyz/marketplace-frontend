import { EcosystemShortProject } from "api-client/resources/ecosystems/types";

export namespace TEcosystemCard {
  export interface Props {
    slug: string;
    bannerUrl: string;
    name: string;
    description: string;
    projectCount: number;
    categories: string[];
    projects: EcosystemShortProject[];
  }
}
