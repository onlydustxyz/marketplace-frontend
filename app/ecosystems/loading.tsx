import { AllEcosystemsLoading } from "app/ecosystems/features/all-ecosystems/all-ecosystems.loading";
import { FeaturedEcosystemsLoading } from "app/ecosystems/features/featured-ecosystems/featured-ecosystems.loading";

import SkeletonEl from "src/components/New/Skeleton/Skeleton";

import { Container } from "components/layout/container/container";

export default async function EcosystemsListLoading() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <Container>
        <SkeletonEl width="30%" height="24px" variant="rounded" />
      </Container>
      <FeaturedEcosystemsLoading />
      <AllEcosystemsLoading />
    </div>
  );
}
