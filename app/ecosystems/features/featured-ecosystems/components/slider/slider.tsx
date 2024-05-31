"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useMemo, useState } from "react";

import { CarouselStepper } from "app/ecosystems/components/carousel-stepper/carousel-stepper";
import { Section } from "app/ecosystems/components/section/section";

import { viewportConfig } from "src/config";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

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
        <CarouselStepper
          prevProps={{
            onClick: () => instanceRef.current?.prev(),
          }}
          nextProps={{
            onClick: () => instanceRef.current?.next(),
          }}
        />
      }
    >
      <div className={cn("pointer-events-none absolute inset-0 p-1.5", { "opacity-0": loaded })}>
        <SkeletonEl width="100%" height="360px" variant="rounded" />
      </div>
      <div
        ref={sliderRef}
        className={cn(
          "keen-slider overflow-hidden transition-all md:rounded-[32px] md:outline md:outline-[6px] md:outline-card-border-medium",
          { "pointer-events-none opacity-0": !loaded }
        )}
      >
        {children.map((c, key) => (
          <div key={key} className="keen-slider__slide h-[134px] bg-transparent p-1 md:h-[360px] md:p-0">
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
