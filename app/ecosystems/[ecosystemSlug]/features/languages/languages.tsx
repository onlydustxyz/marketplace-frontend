import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { FilterCard } from "app/ecosystems/components/filter-card/filter-card";

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
    <div className="flex flex-row gap-6 p-6">
      {languages.map(language => (
        <FilterCard
          key={language.id}
          icon={<img src={language.logoUrl} className="h-6 w-6 object-contain object-center" />}
        >
          {language.name}
        </FilterCard>
      ))}
    </div>
  );
}
