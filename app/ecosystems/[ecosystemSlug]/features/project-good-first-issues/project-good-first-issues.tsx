"use client";

import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { Slide } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slide/slide";
import { Slider } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slider/slider";
import { Section } from "app/ecosystems/components/section/section";
import { SliderStepper } from "app/ecosystems/components/slider-stepper/slider-stepper";

import { Card } from "components/ds/card/card";

export function ProjectGoodFirstIssues() {
  const { ecosystemSlug } = useParams();

  const { data } = ecosystemsApiClient.queries.useGetEcosystemProjectBySlug(
    {
      ecosystemSlug: typeof ecosystemSlug === "string" ? ecosystemSlug : "",
    },
    {
      // TODO @hayden uncomment to test
      // hasGoodFirstIssues: true,
    },
    {
      pageSize: "9",
    }
  );

  const flatProjects = useMemo(() => data?.pages.flatMap(page => page.projects), [data]);

  return (
    <Section
      iconProps={{ remixName: "ri-thumb-up-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.title" } }}
      rightContent={<SliderStepper prevProps={{}} nextProps={{}} />}
    >
      <Card border={"multiColor"} background={"multiColor"} className={"overflow-hidden"}>
        {flatProjects?.length ? (
          <Slider>
            {flatProjects.map(p => (
              <Slide key={p.id} project={p} />
            ))}
          </Slider>
        ) : null}
      </Card>
    </Section>
  );
}
