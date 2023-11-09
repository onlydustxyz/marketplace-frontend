import React from "react";
import Button, { ButtonSize } from "src/components/Button";
import { cn } from "src/utils/cn";

export enum CalloutSizes {
  Small,
  Medium,
  Large,
}

const ButtonSizes = {
  [CalloutSizes.Small]: ButtonSize.Sm,
  [CalloutSizes.Medium]: ButtonSize.Md,
  [CalloutSizes.Large]: ButtonSize.LgLowHeight,
};

interface RainbowBannerProps {
  icon?: React.ReactNode;
  description: string;
  buttonName?: string;
  buttonIcon?: React.ReactNode;
  onClick?: () => void;
  size?: CalloutSizes;
}

export default function RainbowBanner({
  icon,
  description,
  buttonName,
  buttonIcon,
  onClick,
  size = CalloutSizes.Medium,
}: RainbowBannerProps) {
  return (
    <div
      className={cn(
        "bg-rainbow flex animate-wave items-center justify-between gap-3 overflow-hidden rounded-xl text-center font-medium",
        "after:pointer-events-none after:absolute after:h-full after:w-full after:bg-noise-light",
        {
          "min-h-[60px] p-3": size === CalloutSizes.Small,
          "min-h-[80px] p-4": size === CalloutSizes.Medium,
          "min-h-[96px] p-5": size === CalloutSizes.Large,
        }
      )}
    >
      {icon && <div>{icon}</div>}

      <div
        className={cn("flex flex-1 text-left font-walsheim text-base sm:flex-auto", {
          "text-sm": size === CalloutSizes.Small,
          "text-md": size === CalloutSizes.Medium,
          "text-lg": size === CalloutSizes.Large,
        })}
      >
        {description}
      </div>

      {buttonName && onClick && (
        <Button size={ButtonSizes[size]} onClick={onClick}>
          {size === CalloutSizes.Large && buttonIcon ? buttonIcon : null}
          {buttonName}
        </Button>
      )}
    </div>
  );
}
