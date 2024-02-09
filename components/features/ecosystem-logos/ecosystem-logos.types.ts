import { ProjectTypes } from "src/api/Project/types";

import { TAvatar } from "components/ds/avatar/avatar.types";

export namespace TEcosystemLogos {
  export interface Props {
    ecosystems: ProjectTypes.EcoSystem[];
    avatarProps: TAvatar.Variants;
  }
}
