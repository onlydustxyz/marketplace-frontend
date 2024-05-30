import { AllEcosystems } from "app/ecosystems/features/all-ecosystems/all-ecosystems";
import { FeaturedEcosystems } from "app/ecosystems/features/featured-ecosystems/featured-ecosystems";

import { Container } from "components/layout/container/container";

export default async function EcosystemsListPage() {
  return (
    <Container>
      <FeaturedEcosystems />
      <AllEcosystems />
    </Container>
  );
}
