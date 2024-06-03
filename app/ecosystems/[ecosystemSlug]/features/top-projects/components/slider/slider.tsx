"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { viewportConfig } from "src/config";

import { TSlider } from "./slider.types";

export function Slider({ children }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
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
    created() {
      setLoaded(true);
    },
  });

  return (
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
  );
}
