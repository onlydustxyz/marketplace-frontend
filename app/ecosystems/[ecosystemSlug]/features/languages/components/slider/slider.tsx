"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { SliderLoading } from "app/ecosystems/[ecosystemSlug]/features/languages/components/slider/slider.loading";

import { viewportConfig } from "src/config";

import { TSlider } from "./slider.types";

export function Slider({ children }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: "snap",
    slides: {
      perView: 6,
      spacing: 12,
    },
    breakpoints: {
      [`(max-width: ${viewportConfig.breakpoints.lg}px)`]: {
        slides: {
          perView: 4.1,
          spacing: 12,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.md}px)`]: {
        slides: {
          perView: 3.1,
          spacing: 12,
        },
      },
      [`(max-width: ${viewportConfig.breakpoints.sm}px)`]: {
        slides: {
          perView: 2.1,
          spacing: 12,
        },
      },
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      {!loaded && (
        <div
          className={cn("pointer-events-none w-full", {
            "opacity-0": loaded,
          })}
        >
          <SliderLoading />
        </div>
      )}

      <div
        ref={sliderRef}
        className={cn("keen-slider will-change-all !overflow-visible transition-all", {
          "pointer-events-none !fixed top-[9999px] opacity-0": !loaded,
        })}
      >
        {children.map((c, key) => (
          <div key={key} className="keen-slider__slide">
            {c}
          </div>
        ))}
      </div>
    </>
  );
}
