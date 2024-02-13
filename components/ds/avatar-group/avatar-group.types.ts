import { VariantProps } from "tailwind-variants";

import { avatarGroupVariants } from "components/ds/avatar-group/avatar-group.variants";
import { TSkeleton } from "components/ds/skeleton/skeleton.types";

import { TAvatar } from "../avatar/avatar.types";

export namespace TAvatarGroup {
  export type Variants = VariantProps<typeof avatarGroupVariants>;
  export interface Props extends Omit<Variants, "size"> {
    avatars: TAvatar.Props[];
    avatarProps?: TAvatar.Variants;
    className?: string;
  }

  export interface LoadingProps extends TAvatar.Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
  }
}
