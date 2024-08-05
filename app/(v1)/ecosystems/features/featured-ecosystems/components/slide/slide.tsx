import { Banner } from "app/(v1)/ecosystems/components/banner/banner";

import { NEXT_ROUTER } from "constants/router";

import { TSlide } from "./slide.types";

export function Slide({ slug, ...props }: TSlide.Props) {
  return (
    <a
      href={NEXT_ROUTER.ecosystems.details.root(slug)}
      className="outline-st relative z-[1] flex h-full w-full flex-col items-start justify-end overflow-hidden rounded-[16px] bg-card-background-base bg-cover bg-center outline outline-[6px] outline-card-border-medium sm:rounded-none sm:px-8 sm:py-8 sm:outline-none md:px-16 md:py-12"
    >
      <Banner {...props} />
    </a>
  );
}
