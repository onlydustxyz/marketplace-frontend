import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { TagLoading } from "components/ds/tag/tag.loading";
import { ThumbnailGroupLoading } from "components/ds/thumbnail-group/thumbnail-group.loading";
import { ThumbnailLoading } from "components/ds/thumbnail/thumbnail.loading";
import { Flex } from "components/layout/flex/flex";

export function ProjectCardLoading() {
  return (
    <Card className="relative" dataTestId="project-card">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="items-stretch gap-6 divide-stone-100/8 lg:flex-row lg:gap-6 lg:divide-x">
          <Flex direction="col" className="min-w-0 basis-1/3 gap-y-5">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <ThumbnailLoading size="xl" className="mt-1" type={"project"} />
              </div>
              <div className="flex flex-col gap-4 overflow-hidden">
                <SkeletonEl width="90%" height="15px" />
                <div className="flex flex-row gap-2 overflow-hidden">
                  <SkeletonEl width="80px" height="20px" variant="rounded" />
                  <ThumbnailGroupLoading size="s" />
                </div>
              </div>
            </div>
            <TagLoading size={"large"} skeletonProps={{ width: 180 }} />
          </Flex>
          <Flex direction="col" className="basis-2/3 items-stretch justify-center gap-4 lg:gap-4 lg:pl-6">
            <div className="flex flex-col gap-2">
              <SkeletonEl width="60%" height="15px" />
              <SkeletonEl width="55%" height="15px" />
              <SkeletonEl width="50%" height="15px" />
            </div>
            <Flex direction="col" className="w-full flex-row flex-wrap gap-1 xl:gap-2">
              <TagLoading size={"large"} skeletonProps={{ width: 105 }} />
              <TagLoading size={"large"} skeletonProps={{ width: 105 }} />
              <TagLoading size={"large"} skeletonProps={{ width: 105 }} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
