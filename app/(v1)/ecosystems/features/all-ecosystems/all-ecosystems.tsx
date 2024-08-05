import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { EcosystemCard } from "app/(v1)/ecosystems/features/all-ecosystems/components/ecosystem-card/ecosystem-card";
import { ResponsiveWrapper } from "app/(v1)/ecosystems/features/all-ecosystems/components/responsive-wrapper/responsive-wrapper";

import { Section } from "components/layout/section/section";

export async function AllEcosystems() {
  const ecosystems = await ecosystemsApiClient.fetch
    .getAllEcosystems({ featured: false, hidden: false })
    .request()
    .then(res => res.ecosystems);

  return (
    <Section
      iconProps={{ remixName: "ri-global-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.list.allEcosystems.sectionTitle" } }}
    >
      <ResponsiveWrapper>
        {ecosystems.map(ecosystem => (
          <EcosystemCard
            key={ecosystem.id}
            bannerUrl={ecosystem.banners.md.url}
            slug={ecosystem.slug}
            description={ecosystem.description}
            name={ecosystem.name}
            projects={ecosystem.topProjects}
            projectCount={ecosystem.projectCount}
            categories={[]}
          />
        ))}
      </ResponsiveWrapper>
    </Section>
  );
}
