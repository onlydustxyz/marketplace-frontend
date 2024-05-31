import { SlideContent } from "app/ecosystems/features/featured-ecosystems/components/slide-content/slide-content";
import { getBannerColor } from "app/ecosystems/utils/get-banner-color";

import { cn } from "src/utils/cn";

import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TSlide } from "./slide.types";

export function Slide({ imageUrl, slug, color, title, description, smImageUrl }: TSlide.Props) {
  const slideColor = getBannerColor({ color });
  return (
    <a
      href={NEXT_ROUTER.ecosystems.details.root(slug)}
      className="outline-st relative z-[1] flex h-full w-full flex-col items-start justify-end overflow-hidden rounded-[16px] bg-card-background-base bg-cover bg-center outline outline-[6px] outline-card-border-medium sm:rounded-none sm:px-8 sm:py-8 sm:outline-none md:px-16 md:py-12"
    >
      <SlideContent smBannerUrl={smImageUrl} name={title}>
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 -z-[1] h-full w-full object-cover object-center"
          loading={"lazy"}
        />
        <div className="relative z-[1] flex h-auto max-w-[60%] flex-col gap-3">
          <Typography
            variant="special-label"
            className={cn(slideColor, "w-full uppercase")}
            translate={{ token: "v2.pages.ecosystems.list.bannerUpperTitle" }}
          />
          <Typography variant="title-xl" className={cn(slideColor, "w-full")}>
            {title}
          </Typography>
          <Typography variant="body-l" className={cn(slideColor, "w-full")}>
            {description}
          </Typography>
        </div>
      </SlideContent>
    </a>
  );
}
