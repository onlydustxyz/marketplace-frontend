import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import Image from "next/image";

import { Button } from "components/ds/button/button";
import { Section } from "components/layout/section/section";
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
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <a rel="noreferrer" href={article.url} target={"_blank"} className="flex flex-1">
          <Image
            src={article.imageUrl}
            alt={ecosystem.name}
            width={600}
            height={350}
            className="aspect-[16/9] h-full w-full rounded-xl object-cover object-center shadow-light"
          />
        </a>
        <div className="flex flex-1 flex-col items-start justify-between gap-4">
          <a href={article.url} rel="noreferrer" target={"_blank"}>
            <Typography variant={"title-m"} className="transition-all hover:text-spacePurple-200">
              {article.title}
            </Typography>
          </a>
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
