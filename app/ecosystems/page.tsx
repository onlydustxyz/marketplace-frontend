import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { PageTitle } from "app/ecosystems/components/page-title/page-title";
import { AllEcosystems } from "app/ecosystems/features/all-ecosystems/all-ecosystems";
import { AllEcosystemsLoading } from "app/ecosystems/features/all-ecosystems/all-ecosystems.loading";
import { FeaturedEcosystems } from "app/ecosystems/features/featured-ecosystems/featured-ecosystems";
import { FeaturedEcosystemsLoading } from "app/ecosystems/features/featured-ecosystems/featured-ecosystems.loading";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export default async function EcosystemsListPage() {
  return (
    <ScrollView>
      <PosthogOnMount eventName={"ecosystems_list_viewed"} />
      <div className="flex flex-col gap-10 py-8">
        <PageTitle />
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<FeaturedEcosystemsLoading />}>
            <FeaturedEcosystems />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<AllEcosystemsLoading />}>
            <AllEcosystems />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ScrollView>
  );
}
