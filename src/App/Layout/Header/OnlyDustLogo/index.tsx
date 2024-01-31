import { IMAGES } from "src/assets/img";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

export enum OnlyDustLogoWidth {
  Medium = "Medium",
  Large = "Large",
}

interface OnlyDustLogoProps {
  width?: OnlyDustLogoWidth;
}

export default function OnlyDustLogo({ width = OnlyDustLogoWidth.Medium }: OnlyDustLogoProps) {
  const { T } = useIntl();
  return (
    <img
      className={cn({
        "w-10": width === OnlyDustLogoWidth.Medium,
        "w-20": width === OnlyDustLogoWidth.Large,
      })}
      src={IMAGES.logo.original}
      alt={T("images.onlyDustLogo")}
    />
  );
}
