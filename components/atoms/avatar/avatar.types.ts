import type { AvatarProps } from "@nextui-org/react";
import { VariantProps } from "tailwind-variants";

import { AvatarCoreVariants } from "./avatar.variants";

type Variants = VariantProps<typeof AvatarCoreVariants>;
type classNames = Partial<typeof AvatarCoreVariants["slots"]>;
interface NextUiProps extends Omit<AvatarProps, "size"> {}

export interface TAvatarProps extends NextUiProps, Variants {
  classNames?: classNames;
}
