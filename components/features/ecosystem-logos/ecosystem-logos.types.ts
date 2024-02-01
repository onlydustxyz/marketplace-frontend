import { ProjectTypes } from "src/api/Project/types";

import { TThumbnail } from "components/ds/thumbnail/thumbnail.types";

export namespace TEcosystemLogos {
  export interface Props extends TThumbnail.Variants {
    ecosystems: ProjectTypes.EcoSystem[];
  }
}
