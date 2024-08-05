"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useMemo, useState } from "react";

import { SliderStepper } from "app/(v1)/ecosystems/components/slider-stepper/slider-stepper";

import { viewportConfig } from "src/config";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Section } from "components/layout/section/section";

import { TSlider } from "./slider.types";

export function Slider({ children }: TSlider.Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      [`(max-width: ${viewportConfig.breakpoints.sm}px)`]: {
        slides: {
          perView: 1.1,
          spacing: 12,
          origin: "center",
        },
      },
    },
    created() {
      setLoaded(true);
    },
  });

  const navigationsItems = useMemo(() => {
    if (!instanceRef.current) {
      return [];
    }

    return [...Array(instanceRef.current.track.details.slides.length).keys()];
  }, [instanceRef, loaded, currentSlide]);

  const navigationsElements = useMemo(() => {
    return navigationsItems.map(slideId => {
      return (
        <button
          key={slideId}
          onClick={() => {
            instanceRef.current?.moveToIdx(slideId);
          }}
          className={cn("h-2 w-2 rounded-full bg-spaceBlue-400", {
            "!bg-greyscale-50": currentSlide === slideId,
          })}
        />
      );
    });
  }, [navigationsItems, currentSlide]);

  return (
    <Section
      iconProps={{ remixName: "ri-global-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.list.featuredEcosystem.sectionTitle" } }}
      rightContent={
        <SliderStepper
          className={cn("hidden sm:flex")}
          prevProps={{
            onClick: () => instanceRef.current?.prev(),
          }}
          nextProps={{
            onClick: () => instanceRef.current?.next(),
          }}
        />
      }
    >
      {!loaded && (
        <div
          className={cn("pointer-events-none absolute left-0 top-0 w-full p-1.5 aspect-2.16/1 sm:aspect-3.41/1", {
            "opacity-0": loaded,
          })}
        >
          <SkeletonEl
            width="100%"
            height="auto"
            className="min-h-[30vh] aspect-2.16/1 sm:aspect-3.41/1"
            variant="rounded"
          />
        </div>
      )}

      <div
        ref={sliderRef}
        className={cn(
          "keen-slider !overflow-visible transition-all aspect-2.16/1 sm:!overflow-hidden sm:rounded-[32px] sm:outline sm:outline-[6px] sm:outline-card-border-medium sm:aspect-3.41/1",
          { "pointer-events-none opacity-0": !loaded }
        )}
      >
        {children.map((c, key) => (
          <div
            key={key}
            className="keen-slider__slide height-full rounded-[16px] bg-transparent p-1 sm:rounded-none sm:p-0"
          >
            {c}
          </div>
        ))}
      </div>

      <div className="flex w-full flex-row items-center justify-center gap-2 p-4">
        {navigationsElements.map(el => el)}
      </div>
    </Section>
  );
}
