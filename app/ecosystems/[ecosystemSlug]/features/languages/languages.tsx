import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Slider } from "app/ecosystems/[ecosystemSlug]/features/languages/components/slider/slider";
import { FilterCard } from "app/ecosystems/components/filter-card/filter-card";

import { Avatar } from "components/ds/avatar/avatar";

import { NEXT_ROUTER } from "constants/router";

import { TLanguages } from "./languages.types";

export async function Languages({ ecosystemSlug }: TLanguages.Props) {
  const { languages } = await ecosystemsApiClient.fetch
    .getEcosystemLanguagesBySlug(
      { slug: ecosystemSlug },
      {},
      {
        pageSize: 100,
        pageIndex: 0,
      }
    )
    .request();

  if (languages.length < 2) {
    return null;
  }

  return (
    <Slider>
      {languages.map(language => (
        <FilterCard
          as={"a"}
          href={NEXT_ROUTER.projects.allWithParams({ ecosystems: ecosystemSlug, languages: language.slug })}
          key={language.id}
          icon={<Avatar src={language.logoUrl} alt={language.name} size={"s"} />}
        >
          {language.name}
        </FilterCard>
      ))}
    </Slider>
  );
}
