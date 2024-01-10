import { VariantProps } from "tailwind-variants";
import { thumbnailVariants } from "./thumbnail.variants.ts";
import { TSkeleton } from "@/components/ds/skeleton/skeleton.types.ts";

export namespace TThumbnail {
  export type Variants = VariantProps<typeof thumbnailVariants>;

  export interface Props extends Variants {
    src?: string;
    alt: string;
    className?: string;
    defaultSrc?: boolean;
  }

  export interface LoadingProps extends Variants {
    className?: string;
    skeletonProps?: Partial<TSkeleton.BaseProps>;
    animate?: boolean;
  }
}
