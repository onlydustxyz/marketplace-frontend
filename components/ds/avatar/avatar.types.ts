import type { AvatarProps } from "@nextui-org/react";
import { ComponentProps, PropsWithChildren } from "react";
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

  export interface LabelledProps extends PropsWithChildren {
    className?: string;
    href?: string;
    avatarProps?: Props;
    labelProps?: ComponentProps<"div">;
  }
}
