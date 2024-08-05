import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Flex } from "components/layout/flex/flex";

export function LanguagesSectionLoading() {
  return (
    <Flex direction="col" width="full" className="gap-4">
      <SkeletonEl width="30%" height="16px" variant="text" />
      <SkeletonEl width="100%" height="130px" variant="rounded" />
      <SkeletonEl width="100%" height="130px" variant="rounded" />
    </Flex>
  );
}
