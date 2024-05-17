import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { ProfileCardLoading } from "components/features/profile-card/profile-card.loading";
import { Flex } from "components/layout/flex/flex";

export function ProfileOverviewLoading() {
  return (
    <Flex direction="col" className="w-full gap-4 md:gap-0">
      <div className="flex md:hidden">
        <ProfileCardLoading />
      </div>
      <Card className="flex w-full flex-col items-start justify-start gap-6 md:gap-10" background="base">
        <div className="flex w-full flex-row flex-wrap items-start justify-between gap-10">
          <div className="hidden flex-1 md:flex">
            <ProfileCardLoading className="w-full" />
          </div>
          <div className="flex h-full flex-1 flex-col gap-8">
            <div className="flex flex-col gap-2">
              <SkeletonEl width="85%" height="12px" variant="text" />
              <SkeletonEl width="95%" height="12px" variant="text" />
              <SkeletonEl width="92%" height="12px" variant="text" />
              <SkeletonEl width="50%" height="12px" variant="text" />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="grid grid-cols-5 gap-3">
                <SkeletonEl width="40px" height="40px" variant="rounded" />
                <SkeletonEl width="40px" height="40px" variant="rounded" />
                <SkeletonEl width="40px" height="40px" variant="rounded" />
                <SkeletonEl width="40px" height="40px" variant="rounded" />
                <SkeletonEl width="40px" height="40px" variant="rounded" />
              </div>
              <div className="flex gap-2">
                <SkeletonEl width="100px" height="12px" variant="text" />
                <SkeletonEl width="100px" height="12px" variant="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:gap-10">
          <div className="flex w-full flex-1">
            <div className="flex w-full flex-col gap-2">
              <SkeletonEl width="40%" height="16px" variant="text" />
              <div className="grid w-full grid-cols-2 gap-3 xl:grid-cols-4">
                <SkeletonEl width="100%" height="100px" variant="rounded" />
                <SkeletonEl width="100%" height="100px" variant="rounded" />
                <SkeletonEl width="100%" height="100px" variant="rounded" />
                <SkeletonEl width="100%" height="100px" variant="rounded" />
              </div>
            </div>
          </div>
          <div className="flex w-full md:w-1/3">
            <div className="flex w-full flex-col gap-2">
              <SkeletonEl width="40%" height="16px" variant="text" />
              <div className="grid w-full gap-3 md:grid-cols-1 xl:grid-cols-2">
                <SkeletonEl width="100%" height="100px" variant="rounded" />
                <SkeletonEl width="100%" height="100px" variant="rounded" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Flex>
  );
}
