import type { AvatarProps } from "@nextui-org/react";
import { VariantProps } from "tailwind-variants";

import { TSkeleton } from "components/ds/skeleton/skeleton.types";

import { avatarVariants } from "./avatar.variants";

export namespace TAvatar {
  export type Variants = VariantProps<typeof avatarVariants>;

  export interface Props extends Omit<AvatarProps, "size">, Variants {
    isLoading?: boolean;
  }

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
    animate?: boolean;
  }
}
