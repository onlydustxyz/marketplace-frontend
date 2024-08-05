import { PageTitle } from "app/(v1)/ecosystems/components/page-title/page-title";
import { AllEcosystems } from "app/(v1)/ecosystems/features/all-ecosystems/all-ecosystems";
import { FeaturedEcosystems } from "app/(v1)/ecosystems/features/featured-ecosystems/featured-ecosystems";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export default async function EcosystemsListPage() {
  return (
    <ScrollView>
      <PosthogOnMount eventName={"ecosystems_list_viewed"} />
      <Container>
        <div className="flex flex-col gap-10 py-8">
          <PageTitle />
          <FeaturedEcosystems />
          <AllEcosystems />
        </div>
      </Container>
    </ScrollView>
  );
}
