import type { AvatarProps } from "@nextui-org/react";
import { VariantProps } from "tailwind-variants";

import { avatarVariants } from "./avatar.variants";

export namespace TAvatar {
  export type Variants = VariantProps<typeof avatarVariants>;

  export interface Props extends Omit<AvatarProps, "size" | "className">, Variants {
    isLoading?: boolean;
  }
}
