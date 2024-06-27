import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Flex } from "components/layout/flex/flex";

export function ContributionHeaderLoading() {
  return (
    <Flex alignItems="center" className="gap-2">
      <SkeletonEl width={32} height={32} variant="rounded" />

      <SkeletonEl width="75%" height={32} />
    </Flex>
  );
}
