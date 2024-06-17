import { ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { AvatarCoreVariants } from "./avatar.variants";

type Variants = VariantProps<typeof AvatarCoreVariants>;
type classNames = Partial<typeof AvatarCoreVariants["slots"]>;

export interface TAvatarProps extends Variants {
  classNames?: classNames;
  src?: string;
  showFallback?: boolean;
  name?: string;
  fallback?: ReactNode;
}
