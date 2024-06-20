import { ElementType } from "react";

import { BadgePort } from "components/atoms/badge/badge.types";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function BadgeLoading<C extends ElementType = "div">({ size }: BadgePort<C>) {
  const [w, h] = (() => {
    if (size === "s") {
      return [16, 16];
    }

    return [24, 24];
  })();

  return <SkeletonEl width={w} height={h} className="rounded" />;
}
