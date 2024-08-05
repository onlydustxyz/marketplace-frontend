import { AvatarGroupLoading } from "components/ds/avatar-group/avatar-group.loading";
import { AvatarLoading } from "components/ds/avatar/avatar.loading";
import { Card } from "components/ds/card/card";
import { IconTagLoading } from "components/ds/icon-tag/icon-tag.loading";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Flex } from "components/layout/flex/flex";

export function ProjectCardLoading() {
  return (
    <Card className="relative bg-spaceBlue-900" dataTestId="project-card">
      <Flex direction="row" className="gap-5">
        <div className="relative hidden flex-shrink-0 md:block">
          <AvatarLoading size="xl" shape="square" />
        </div>
        <Flex direction="col" className="flex-1 gap-3">
          <Flex direction="row" className="items-center gap-3">
            <div className="relative block flex-shrink-0 md:hidden">
              <AvatarLoading size="l" shape="square" />
            </div>
            <div className="mt-1 flex flex-1 flex-col gap-2">
              <SkeletonEl width="60%" height="15px" />
              <SkeletonEl width="55%" height="15px" />
            </div>
            <Flex direction="row" className="gap-2">
              <IconTagLoading skeletonProps={{ width: 32, height: 32, radius: 100 }} />
              <IconTagLoading skeletonProps={{ width: 32, height: 32, radius: 100 }} />
              <IconTagLoading skeletonProps={{ width: 32, height: 32, radius: 100 }} />
            </Flex>
          </Flex>
          <Flex direction="row" className="mt-5 grid grid-cols-2 items-center gap-4 md:grid-cols-4">
            <div className="flex flex-row items-center gap-2">
              <AvatarGroupLoading size="xs" />
              <SkeletonEl width="50%" height="15px" variant="rounded" />
            </div>
            <div>
              <SkeletonEl width="80%" height="15px" variant="rounded" />
            </div>
            <div>
              <SkeletonEl width="80%" height="15px" variant="rounded" />
            </div>
            <div>
              <SkeletonEl width="80%" height="15px" variant="rounded" />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
