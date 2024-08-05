import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Flex } from "components/layout/flex/flex";

export function TotalEarnedGraphLoading() {
  return (
    <Flex direction="col" width="full" className="gap-4">
      <SkeletonEl width="60%" variant="rounded" height={32} />

      <SkeletonEl width="100%" variant="rounded" height={253} />
    </Flex>
  );
}
