import { cn } from "src/utils/cn";

import { TIconTag } from "components/ds/icon-tag/icon-tag.types";
import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function IconTagLoading({ className, skeletonProps }: TIconTag.LoadingProps) {
  return (
    <SkeletonEl height="28px" width="28px" variant="rounded" {...skeletonProps} className={cn("border-0", className)} />
  );
}
