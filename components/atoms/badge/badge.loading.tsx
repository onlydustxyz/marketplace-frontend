import { ElementType } from "react";

import { TBadgeProps } from "components/atoms/badge/badge.types";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function BadgeLoading<C extends ElementType = "div">({ size }: TBadgeProps<C>) {
  const [w, h] = (() => {
    if (size === "s") {
      return [16, 16];
    }

    return [24, 24];
  })();

  return <SkeletonEl variant="rounded" width={w} height={h} className="rounded" />;
}
