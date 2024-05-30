"use client";

import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useMemo, useState } from "react";

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
    created() {
      setLoaded(true);
    },
  });

  const navigations = useMemo(() => {
    if (!instanceRef.current) {
      return [];
    }

    return [...Array(instanceRef.current.track.details.slides.length).keys()];
  }, [instanceRef, loaded]);

  return (
    <>
      <div ref={sliderRef} className={cn("keen-slider transition-all", { "pointer-events-none opacity-0": !loaded })}>
        {children.map((c, key) => (
          <div key={key} className="keen-slider__slide o h-[360px] bg-transparent p-1.5">
            {c}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-2 p-4">
        {navigations.map(slideId => {
          return (
            <button
              key={slideId}
              onClick={() => {
                instanceRef.current?.moveToIdx(slideId);
              }}
              className={cn("h-2 w-2 rounded-full bg-spaceBlue-400", {
                "!bg-greyscale-50": currentSlide === slideId,
              })}
            ></button>
          );
        })}
      </div>
    </>
  );
}
