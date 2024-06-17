import { ReactNode } from "react";
import { VariantProps } from "tailwind-variants";

import { AvatarCoreVariants } from "./avatar.variants";

type Variants = VariantProps<typeof AvatarCoreVariants>;
type classNames = Partial<typeof AvatarCoreVariants["slots"]>;

export interface TAvatarProps extends Variants {
  /**
   * Classname to change the classNames of the element. if className is passed, it will be added to the base slot.
   * @default undefined
   */
  classNames?: classNames;
  /**
   * the source of the image
   * @default undefined
   */
  src?: string;
  /**
   * The name of the person in the avatar. - if src has loaded, the name will be used as the alt attribute of the img
   * @default undefined
   */
  name?: string;
  /**
   * If false, the avatar will show the background color while loading.
   * @default true
   */
  showFallback?: boolean;
  /**
   * Custom fallback component.
   * @default undefined
   */
  fallback?: ReactNode;
}
