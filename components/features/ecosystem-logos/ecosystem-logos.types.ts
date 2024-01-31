import { TProjects } from "app/migration/projects/types/projects.types";

import { TThumbnail } from "components/ds/thumbnail/thumbnail.types";

export namespace TEcosystemLogos {
  export interface Props extends TThumbnail.Variants {
    ecosystems: TProjects.EcoSystem[];
  }
}
