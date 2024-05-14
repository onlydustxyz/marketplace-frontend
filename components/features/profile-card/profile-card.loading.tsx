import { cn } from "src/utils/cn";

import { AvatarLoading } from "components/ds/avatar/avatar.loading";
import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { TagLoading } from "components/ds/tag/tag.loading";
import { TProfileCard } from "components/features/profile-card/profile-card.types";

export function ProfileCardLoading({ skeletonProps, className, ...props }: TProfileCard.LoadingProps) {
  return (
    <Card className={cn("relative flex w-[400px] flex-col gap-4", className)} background="base" border="multiColor">
      <div className="relative flex gap-4">
        <AvatarLoading {...props} skeletonProps={skeletonProps} size="3xl" />
        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between gap-2">
            <SkeletonEl width="60%" height="24px" variant="text" />
            <SkeletonEl width="20%" height="24px" variant="text" />
          </div>
          <div className="flex justify-between gap-2">
            <SkeletonEl width="50%" height="16px" variant="text" />
            <SkeletonEl width="10%" height="16px" variant="text" />
          </div>
          <div className="flex w-2/3 flex-wrap items-center gap-2">
            <div className="flex flex-1 items-center gap-1">
              <SkeletonEl width="12px" height="12px" variant="circular" />
              <SkeletonEl width="80%" height="8px" variant="rounded" />
            </div>
            <div className="flex flex-1 items-center gap-1">
              <SkeletonEl width="12px" height="12px" variant="circular" />
              <SkeletonEl width="80%" height="8px" variant="rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <TagLoading size="large" skeletonProps={skeletonProps} />
        <TagLoading size="large" skeletonProps={skeletonProps} />
      </div>
    </Card>
  );
}
