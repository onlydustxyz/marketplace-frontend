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
    mode: "snap",
    slides: {
      perView: 5,
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
