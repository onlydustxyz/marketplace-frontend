"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { SliderStepper } from "app/ecosystems/components/slider-stepper/slider-stepper";

import { viewportConfig } from "src/config";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TSlider } from "./slider.types";

export function Slider({ children, icon, title }: TSlider.Props) {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slides: {
      perView: 2.1,
      spacing: 12,
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

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex w-full flex-row items-center justify-start gap-2">
          <Icon {...icon} />
          <Typography variant="title-m">{title}</Typography>
        </div>
        <SliderStepper
          className={cn("hidden sm:flex")}
          prevProps={{
            onClick: () => instanceRef.current?.prev(),
          }}
          nextProps={{
            onClick: () => instanceRef.current?.next(),
          }}
        />
      </div>
      <div
        ref={sliderRef}
        className={cn("keen-slider !overflow-hidden transition-all", {
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
