import { BannerContent } from "app/ecosystems/components/banner/banner-content";
import { getBannerColor } from "app/ecosystems/utils/get-banner-color";

import { cn } from "src/utils/cn";

import { Typography } from "components/layout/typography/typography";

import { TBanner } from "./banner.types";

export function Banner({ imageUrl, color, title, description, smImageUrl }: TBanner.Props) {
  const slideColor = getBannerColor({ color });

  return (
    <BannerContent smBannerUrl={smImageUrl} name={title}>
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
    </BannerContent>
  );
}
