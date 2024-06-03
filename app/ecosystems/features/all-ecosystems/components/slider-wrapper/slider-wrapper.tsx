import { cn } from "@nextui-org/react";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

import { TSliderWrapper } from "./slider-wrapper.types";

export function SliderWrapper({ children }: TSliderWrapper.Props) {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 1.1,
      spacing: 12,
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <div
      ref={sliderRef}
      className={cn("keen-slider !overflow-visible transition-all sm:!overflow-hidden", {
        "pointer-events-none opacity-0": !loaded,
      })}
    >
      {children.map((c, key) => (
        <div key={key} className="keen-slider__slide h-auto bg-transparent p-1">
          {c}
        </div>
      ))}
    </div>
  );
}
