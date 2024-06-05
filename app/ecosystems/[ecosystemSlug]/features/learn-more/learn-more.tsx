import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import Image from "next/image";

import { Section } from "app/ecosystems/components/section/section";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TLearnMore } from "./learn-more.types";

export async function LearnMore({ ecosystemSlug }: TLearnMore.Props) {
  const ecosystem = await ecosystemsApiClient.fetch.getEcosystemBySlug({ slug: ecosystemSlug }).request({
    next: { revalidate: 120 },
  });

  const article = ecosystem.relatedArticles?.[0];

  if (!article) {
    return null;
  }

  return (
    <Section
      iconProps={{ remixName: "ri-graduation-cap-line" }}
      titleProps={{
        translate: {
          token: "v2.pages.ecosystems.detail.learnMore.title",
          params: { name: ecosystem.name },
        },
      }}
    >
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <Image
          src={article.imageUrl}
          alt={ecosystem.name}
          width={600}
          height={350}
          className="h-full w-1/2 rounded-xl object-cover object-center shadow-light aspect-[16/9]"
        />
        <div className="flex flex-col items-start justify-between gap-4">
          <Typography variant={"title-m"}>{article.title}</Typography>
          <Typography variant={"body-l"} className="text-spaceBlue-100">
            {article.description}
          </Typography>
          <div className="mt-2">
            <Button as={"a"} href={article.url} target={"_blank"}>
              <Translate token={"v2.pages.ecosystems.detail.learnMore.button"} />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
