"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useMemo, useState } from "react";

import { Section } from "app/ecosystems/components/section/section";
import { SliderStepper } from "app/ecosystems/components/slider-stepper/slider-stepper";

import { viewportConfig } from "src/config";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { AspectRatio } from "components/layout/aspect-ratio/aspect-ratio";

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
          className={cn("pointer-events-none aspect-[3.41/1] w-full p-1.5", {
            "opacity-0": loaded,
          })}
        >
          <SkeletonEl width="100%" height="auto" className="aspect-[3.41/1] min-h-[30vh]" variant="rounded" />
        </div>
      )}
      <div
        ref={sliderRef}
        className={cn(
          "keen-slider !overflow-visible transition-all sm:!overflow-hidden sm:rounded-[32px] sm:outline sm:outline-[6px] sm:outline-card-border-medium",
          { "pointer-events-none opacity-0": !loaded }
        )}
      >
        {children.map((c, key) => (
          <div
            key={key}
            className="keen-slider__slide height-full rounded-[16px] bg-transparent p-1 sm:rounded-none sm:p-0"
          >
            <AspectRatio ratio="3.41/1" breakpoints={[{ width: viewportConfig.breakpoints.sm, ratio: "2.16/1" }]}>
              {c}
            </AspectRatio>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-2 p-4">
        {navigationsElements.map(el => el)}
      </div>
    </Section>
  );
}
