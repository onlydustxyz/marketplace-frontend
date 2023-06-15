import onlyDustLogo from "assets/img/onlydust-logo.png";
import classNames from "classnames";
import { useIntl } from "src/hooks/useIntl";

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
      className={classNames({
        "w-10": width === OnlyDustLogoWidth.Medium,
        "w-20": width === OnlyDustLogoWidth.Large,
      })}
      src={onlyDustLogo}
      alt={T("images.onlyDustLogo")}
    />
  );
}
