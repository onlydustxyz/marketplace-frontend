import { GetBannerColor } from "app/ecosystems/utils/get-banner-color";

import { cn } from "src/utils/cn";

import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TSlide } from "./slide.types";

export function Slide({ imageUrl, slug, color, title, description }: TSlide.Props) {
  const slideColor = GetBannerColor({ color });
  return (
    <a
      href={NEXT_ROUTER.ecosystems.details.root(slug)}
      className="outline-st flex h-full w-full flex-col items-start justify-end rounded-[32px] bg-card-background-base bg-cover bg-center px-16 py-12 outline outline-[6px] outline-card-border-medium"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="flex h-auto max-w-[60%] flex-col gap-3">
        <Typography
          variant="special-label"
          className={cn(slideColor, "w-full")}
          translate={{ token: "v2.pages.ecosystems.list.bannerUpperTitle" }}
        />
        <Typography variant="title-xl" className={cn(slideColor, "w-full")}>
          {title}
        </Typography>
        <Typography variant="body-l" className={cn(slideColor, "w-full")}>
          {description}
        </Typography>
      </div>
    </a>
  );
}
