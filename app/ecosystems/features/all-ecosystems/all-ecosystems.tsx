import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Section } from "app/ecosystems/components/section/section";
import { EcosystemCard } from "app/ecosystems/features/all-ecosystems/components/ecosystem-card/ecosystem-card";
import { ResponsiveWrapper } from "app/ecosystems/features/all-ecosystems/components/responsive-wrapper/responsive-wrapper";

export async function AllEcosystems() {
  const ecosystems = await ecosystemsApiClient.fetch.getAllEcosystems({ featured: false }).request();
  console.log("all ecosystems", ecosystems);

  return (
    <Section
      iconProps={{ remixName: "ri-global-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.list.allEcosystems.sectionTitle" } }}
    >
      <ResponsiveWrapper>
        {ecosystems.ecosystems.map(ecosystem => (
          <EcosystemCard
            key={ecosystem.id}
            bannerUrl={ecosystem.banners.xl.url}
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
