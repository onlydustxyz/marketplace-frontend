import { Suspense } from "react";

import { AllEcosystems } from "app/ecosystems/features/all-ecosystems/all-ecosystems";
import { FeaturedEcosystems } from "app/ecosystems/features/featured-ecosystems/featured-ecosystems";

import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Typography } from "components/layout/typography/typography";

export default async function EcosystemsListPage() {
  return (
    <ScrollView>
      <div className="flex flex-col gap-10 py-8">
        <Container>
          <Typography variant={"title-xl"} translate={{ token: "v2.pages.ecosystems.list.pageTitle" }} />
        </Container>
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedEcosystems />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AllEcosystems />
        </Suspense>
      </div>
    </ScrollView>
  );
}
