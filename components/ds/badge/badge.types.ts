import { RemixIconsName } from "@/components/layout/icon/remix-icon-names.type";
import { badgeVariants } from "./badge.variants";
import { VariantProps } from "tailwind-variants";

export namespace TBadge {
  export type Variants = VariantProps<typeof badgeVariants>;

  export interface Props extends Variants {
    value: number;
    remixIconName?: RemixIconsName;
    className?: string;
  }
}
