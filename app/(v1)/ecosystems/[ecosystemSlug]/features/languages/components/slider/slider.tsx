"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { SliderLoading } from "app/(v1)/ecosystems/[ecosystemSlug]/features/languages/components/slider/slider.loading";
import { SliderStepper } from "app/(v1)/ecosystems/components/slider-stepper/slider-stepper";

import { viewportConfig } from "src/config";

import { Section } from "components/layout/section/section";

import { TSlider } from "./slider.types";

export function Slider({ children }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);
  const nbSlides = children.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(nbSlides);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: "snap",
    slides: {
      perView: 6,
      spacing: 12,
    },
    breakpoints: {
      [`(max-width: ${viewportConfig.breakpoints.xl}px)`]: {
        slides: {
          perView: 4.1,
          spacing: 12,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.lg}px)`]: {
        slides: {
          perView: 3.1,
          spacing: 12,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.md}px)`]: {
        slides: {
          perView: 2.1,
          spacing: 12,
        },
      },
    },
    created() {
      setLoaded(true);
    },
    slideChanged(slider) {
      const { rel: currentIndex, maxIdx: maxIndex } = slider.track.details;

      setCurrentIndex(currentIndex);
      setMaxIndex(maxIndex);
    },
  });

  return (
    <Section
      iconProps={{ remixName: "ri-code-s-slash-line" }}
      titleProps={{
        translate: {
          token: "v2.pages.ecosystems.detail.languages.title",
        },
      }}
      rightContent={
        nbSlides > 6 ? (
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
        ) : null
      }
    >
      <div className="relative w-full">
        {!loaded && (
          <div
            className={cn("pointer-events-none absolute left-0 top-0 w-full", {
              "opacity-0": loaded,
            })}
          >
            <SliderLoading />
          </div>
        )}

        <div
          ref={sliderRef}
          className={cn("keen-slider will-change-all !overflow-visible transition-all xl:!overflow-hidden", {
            "pointer-events-none opacity-0": !loaded,
          })}
        >
          {children.map((c, key) => (
            <div key={key} className="keen-slider__slide">
              {c}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
