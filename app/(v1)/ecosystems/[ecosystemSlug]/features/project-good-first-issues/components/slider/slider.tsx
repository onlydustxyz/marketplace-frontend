"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { TSlider } from "app/(v1)/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slider/slider.types";
import { SliderStepper } from "app/(v1)/ecosystems/components/slider-stepper/slider-stepper";

import { viewportConfig } from "src/config";

import { Card } from "components/ds/card/card";
import { BaseLink } from "components/layout/base-link/base-link";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export function Slider({ ecosystemSlug, children, hasMore }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const nbSlides = children.length;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: nbSlides < 3 ? 2 : 3,
      spacing: 12,
    },
    breakpoints: {
      [`(max-width: ${viewportConfig.breakpoints.lg}px)`]: {
        slides: {
          perView: nbSlides < 3 ? 2 : 2.1,
          spacing: 12,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.sm}px)`]: {
        slides: {
          perView: nbSlides < 2 ? 1 : 1.1,
          spacing: 12,
          origin: "center",
        },
      },
    },
    created(slider) {
      setLoaded(true);
      setMaxIndex(slider.track.details.maxIdx);
    },
    updated(slider) {
      setMaxIndex(slider.track.details.maxIdx);
    },
    slideChanged(slider) {
      const { rel: currentIndex, maxIdx: maxIndex } = slider.track.details;

      setCurrentIndex(currentIndex);
      setMaxIndex(maxIndex);
    },
  });

  return (
    <Section
      iconProps={{ remixName: "ri-thumb-up-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.title" } }}
      rightContent={
        <div className={"flex items-center gap-4"}>
          {hasMore ? (
            <BaseLink
              href={NEXT_ROUTER.projects.allWithParams({ hasGoodFirstIssues: "true", ecosystems: ecosystemSlug })}
            >
              <Typography
                variant="body-s-bold"
                className="text-spacePurple-500"
                translate={{ token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.viewAll" }}
              />
            </BaseLink>
          ) : null}

          {nbSlides > 3 ? (
            <div className={"hidden sm:block"}>
              <SliderStepper
                prevProps={{
                  onClick: instanceRef.current?.prev,
                  disabled: currentIndex === 0,
                }}
                nextProps={{
                  onClick: instanceRef.current?.next,
                  disabled: currentIndex >= maxIndex,
                }}
              />
            </div>
          ) : null}
        </div>
      }
    >
      <Card border={"multiColor"} background={"multiColor"} className={"overflow-hidden"}>
        <div
          ref={sliderRef}
          className={cn("keen-slider will-change-all !overflow-visible transition-all", {
            "pointer-events-none opacity-0": !loaded,
          })}
        >
          {children.map((c, key) => (
            <div key={key} className="keen-slider__slide">
              {c}
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
