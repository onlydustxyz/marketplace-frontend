import { Leader } from "src/types";

import { TAvatar } from "components/ds/avatar/avatar.types";

export namespace TContributorsAvatars {
  export interface Props {
    contributors: Leader[];
    avatarProps: TAvatar.Variants;
  }
}
