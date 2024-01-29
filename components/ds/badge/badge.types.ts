import { VariantProps } from "tailwind-variants";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { badgeVariants } from "./badge.variants";

export namespace TBadge {
  export type Variants = VariantProps<typeof badgeVariants>;

  export interface Props extends Variants {
    value: number;
    remixIconName?: RemixIconsName;
    className?: string;
  }
}
