import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Flex } from "components/layout/flex/flex";

export function SelectableBillingProfileLoading() {
  return (
    <Card background={false} border="heavy" className="p-4">
      <Flex justifyContent="between" alignItems="center" className="gap-1">
        <Flex justifyContent="start" alignItems="center" className="gap-4">
          <SkeletonEl width="40px" height="40px" variant="circular" color="grey" />
          <SkeletonEl width="100px" height="14px" variant="text" color="grey" />
        </Flex>

        <SkeletonEl width="20px" height="20px" variant="rounded" color="grey" />
      </Flex>
    </Card>
  );
}
