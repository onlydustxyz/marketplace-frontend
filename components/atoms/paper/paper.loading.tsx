import { ComponentProps } from "react";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function PaperLoading({ width, height }: Pick<ComponentProps<typeof SkeletonEl>, "width" | "height">) {
  return <SkeletonEl width={width} height={height} className="rounded-xl" />;
}
