import { cn } from "@nextui-org/react";
import { ElementType } from "react";

import { TagPort } from "components/atoms/tag/tag.types";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function TagLoading<C extends ElementType = "span">({ size, hideText, shape }: TagPort<C>) {
  const [w, h] = (() => {
    if (hideText) {
      if (size === "s") {
        return [32, 32];
      }

      if (size === "xs") {
        return [24, 24];
      }

      return [40, 40];
    }

    if (size === "s") {
      return [69, 32];
    }

    if (size === "xs") {
      return [59, 24];
    }

    return [69, 40];
  })();

  return (
    <SkeletonEl
      variant="rounded"
      width={w}
      height={h}
      className={cn("rounded-full", { "rounded-md": shape === "square" })}
    />
  );
}
