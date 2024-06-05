"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { SliderLoading } from "app/ecosystems/[ecosystemSlug]/features/languages/components/slider/slider.loading";

import { viewportConfig } from "src/config";

import { useWheelControls } from "hooks/sliders/use-wheel-controls";

import { TSlider } from "./slider.types";

export function Slider({ children }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);
  const WheelControls = useWheelControls();

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: "free",
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
    },
    [WheelControls.current]
  );

  return (
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
        className={cn("keen-slider will-change-all !overflow-visible transition-all sm:!overflow-hidden", {
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
  );
}
