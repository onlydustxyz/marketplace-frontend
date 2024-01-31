import { ElementType, PropsWithChildren } from "react";
import { VariantProps } from "tailwind-variants";

import { roundedImageVariants } from "./rounded-image.variants";

export namespace TRoundedImage {
  export type Variants = VariantProps<typeof roundedImageVariants>;

  export interface Props extends PropsWithChildren, Variants {
    as?: ElementType;
    src: string | null;
    alt: string | null;
    className?: string;
    useLogoFallback?: boolean;
  }
}
