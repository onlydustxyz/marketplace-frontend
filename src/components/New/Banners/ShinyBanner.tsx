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

type ButtonT = {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
  size?: ButtonSize;
};

interface ShinyBannerProps {
  icon?: React.ReactNode;
  description: string;
  button?: ButtonT;
  size?: CalloutSizes;
  className?: string;
}

export default function ShinyBanner({
  icon,
  description,
  button,
  size = CalloutSizes.Medium,
  className,
}: ShinyBannerProps) {
  return (
    <div
      className={cn(
        "relative z-10 overflow-hidden rounded-[15px]",
        "flex w-full items-center justify-center",
        "before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen before:animate-spin-invert-slow before:bg-multi-color-gradient",
        "after:absolute after:left-px after:top-px after:-z-[1] after:h-[calc(100%-2px)] after:w-[calc(100%-2px)] after:rounded-[15px] after:bg-card-background-base",
        "before:animate-glow-border-slow",
        {
          "min-h-[60px] p-3": size === CalloutSizes.Small,
          "min-h-[80px] p-4": size === CalloutSizes.Medium,
          "min-h-[96px] p-5": size === CalloutSizes.Large,
        },
        className
      )}
    >
      <div className="flex w-full animate-pulse-grow-slow items-center justify-center gap-3">
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

        {button && (
          <Button size={button.size || ButtonSizes[size]} onClick={button.onClick}>
            {button.icon ? button.icon : null}
            {button.name}
          </Button>
        )}
      </div>
    </div>
  );
}
