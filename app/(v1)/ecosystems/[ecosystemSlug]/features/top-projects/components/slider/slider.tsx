"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { SliderStepper } from "app/(v1)/ecosystems/components/slider-stepper/slider-stepper";

import { viewportConfig } from "src/config";

import { Card } from "components/ds/card/card";
import { Section } from "components/layout/section/section";

import { TSlider } from "./slider.types";

export function Slider({ children }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const nbSlides = children.length;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 3.1,
      spacing: 16,
    },
    breakpoints: {
      [`(max-width: ${viewportConfig.breakpoints.xl}px)`]: {
        slides: {
          perView: 2.1,
          spacing: 16,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.md}px)`]: {
        slides: {
          perView: 3.1,
          spacing: 16,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.sm}px)`]: {
        slides: {
          perView: 2.1,
          spacing: 16,
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
      iconProps={{ remixName: "ri-trophy-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.topProjects.title", params: { count: nbSlides } } }}
      rightContent={
        nbSlides > 3 ? (
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
      <Card
        border={"multiColor"}
        background={false}
        className={"overflow-hidden bg-gradient-to-b from-[#0c091c] to-[#0c0b20]"}
      >
        <div
          ref={sliderRef}
          className={cn("keen-slider will-change-all !overflow-visible transition-all", {
            "pointer-events-none opacity-0": !loaded,
          })}
        >
          {children.map((c, key) => (
            <div key={key} className="keen-slider__slide !overflow-visible">
              {c}
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
