"use client";

import { cn } from "@nextui-org/react";
import { type KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { viewportConfig } from "src/config";

import { TSlider } from "./slider.types";

export function Slider({ children }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);

  const ResizePlugin: KeenSliderPlugin = slider => {
    const observer = new ResizeObserver(function () {
      slider.update();
    });

    slider.on("created", () => {
      observer.observe(slider.container);
    });
    slider.on("destroyed", () => {
      observer.unobserve(slider.container);
    });
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 3,
        spacing: 12,
      },
      breakpoints: {
        [`(max-width: ${viewportConfig.breakpoints.lg}px)`]: {
          slides: {
            perView: 2,
          },
        },
        [`(max-width: ${viewportConfig.breakpoints.sm}px)`]: {
          slides: {
            perView: 1,
            origin: "center",
          },
        },
      },
      // created() {
      //   setLoaded(true);
      // },
    },
    [ResizePlugin]
  );

  console.log({ instanceRef });

  return (
    <div
      ref={sliderRef}
      className={cn("keen-slider will-change-all !overflow-visible transition-all", {
        // "pointer-events-none opacity-0": !loaded,
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
