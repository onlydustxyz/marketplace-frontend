"use client";

import { cn } from "@nextui-org/react";
import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { useKeenSlider } from "keen-slider/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Slide } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slide/slide";
import { Section } from "app/ecosystems/components/section/section";
import { SliderStepper } from "app/ecosystems/components/slider-stepper/slider-stepper";

import { viewportConfig } from "src/config";

import { Card } from "components/ds/card/card";

const PAGE_SIZE = 6;

export function Slider() {
  const { ecosystemSlug } = useParams();

  const { data, hasNextPage, fetchNextPage } = ecosystemsApiClient.queries.useGetEcosystemProjectBySlug(
    {
      ecosystemSlug: typeof ecosystemSlug === "string" ? ecosystemSlug : "",
    },
    {
      // TODO @hayden uncomment to test
      // hasGoodFirstIssues: true,
    },
    {
      pageSize: String(PAGE_SIZE),
    }
  );

  const flatProjects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(PAGE_SIZE);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      number: flatProjects.length,
      perView: 3,
      spacing: 12,
    },
    breakpoints: {
      [`(max-width: ${viewportConfig.breakpoints.lg}px)`]: {
        slides: {
          perView: 2,
          spacing: 12,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.sm}px)`]: {
        slides: {
          perView: 1,
          spacing: 12,
          origin: "center",
        },
      },
    },
    created() {
      setLoaded(true);
    },
    updated(slider) {
      setMaxIndex(slider.track.details.maxIdx);
    },
    slideChanged(slider) {
      const { rel: currentIndex, maxIdx: maxIndex } = slider.track.details;

      setCurrentIndex(currentIndex);
      setMaxIndex(maxIndex);

      // TODO @hayden pin down condition
      if (hasNextPage && currentIndex >= maxIndex - 2) {
        fetchNextPage();
      }
    },
  });

  useEffect(() => {
    if (flatProjects.length < 3) {
      instanceRef.current?.update({
        slides: {
          perView: 2,
        },
      });
    }
  }, [flatProjects]);

  return (
    <Section
      iconProps={{ remixName: "ri-thumb-up-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.title" } }}
      rightContent={
        flatProjects.length > 3 ? (
          <SliderStepper
            prevProps={{
              onClick: instanceRef.current?.prev,
              disabled: currentIndex === 0,
            }}
            nextProps={{
              onClick: instanceRef.current?.next,
              disabled: !hasNextPage && currentIndex >= maxIndex,
            }}
          />
        ) : null
      }
    >
      <Card border={"multiColor"} background={"multiColor"} className={"overflow-hidden"}>
        {flatProjects.length ? (
          <div
            ref={sliderRef}
            className={cn("keen-slider will-change-all !overflow-visible transition-all", {
              "pointer-events-none opacity-0": !loaded,
            })}
          >
            {flatProjects.map(p => (
              <div key={p.id} className="keen-slider__slide">
                <Slide project={p} />
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </Section>
  );
}
