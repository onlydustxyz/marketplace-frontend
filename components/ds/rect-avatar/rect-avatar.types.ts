import type { AvatarProps } from "@nextui-org/react";
import { VariantProps } from "tailwind-variants";

import { rectAvatarVariants } from "components/ds/rect-avatar/rect-avatar.variants";
import { TSkeleton } from "components/ds/skeleton/skeleton.types";

export namespace TRectAvatar {
  export type Variants = VariantProps<typeof rectAvatarVariants>;

  export interface Props extends Omit<AvatarProps, "size">, Variants {
    isLoading?: boolean;
  }

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
    animate?: boolean;
  }
}
