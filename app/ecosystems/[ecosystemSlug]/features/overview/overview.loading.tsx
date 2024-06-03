import SkeletonEl from "src/components/New/Skeleton/Skeleton";
import { viewportConfig } from "src/config";

import { AspectRatio } from "components/layout/aspect-ratio/aspect-ratio";

export async function OverviewLoading() {
  return (
    <AspectRatio ratio="3.41/1" breakpoints={[{ width: viewportConfig.breakpoints.sm, ratio: "2.16/1" }]}>
      <SkeletonEl width="100%" height="100%" variant="rounded" />
    </AspectRatio>
  );
}
