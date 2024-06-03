import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Slider } from "app/ecosystems/[ecosystemSlug]/features/languages/components/slider/slider";
import { FilterCard } from "app/ecosystems/components/filter-card/filter-card";
import { Section } from "app/ecosystems/components/section/section";

import { NEXT_ROUTER } from "constants/router";

import { TLanguages } from "./languages.types";

export async function Languages({ ecosystemSlug }: TLanguages.Props) {
  const languages = await ecosystemsApiClient.fetch
    .getEcosystemLanguagesBySlug(
      { slug: ecosystemSlug },
      {
        pageSize: 5,
        pageIndex: 0,
      }
    )
    .request({
      next: { revalidate: 120 },
    })
    .then(res => res.languages);

  return (
    <Section
      iconProps={{ remixName: "ri-code-s-slash-line" }}
      titleProps={{
        translate: {
          token: "v2.pages.ecosystems.detail.languages.title",
        },
      }}
    >
      <Slider>
        {languages.map(language => (
          <FilterCard
            as={"a"}
            href={NEXT_ROUTER.projects.allWithParams({ ecosystems: ecosystemSlug, languages: language.id })}
            key={language.id}
            icon={<img src={language.logoUrl} alt={language.name} className="h-6 w-6 object-contain object-center" />}
          >
            {language.name}
          </FilterCard>
        ))}
      </Slider>
    </Section>
  );
}
