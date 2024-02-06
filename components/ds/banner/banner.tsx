import { cn } from "src/utils/cn";

import { bannerVariants } from "components/ds/banner/banner.variants";
import { Button } from "components/ds/button/button";
import { TButton } from "components/ds/button/button.types";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TBanner } from "./banner.types";

export function Banner({ children, title, description, icon, button, customButton, ...props }: TBanner.Props) {
  const slots = bannerVariants({ ...props });
  const iconSize = {
    l: 32,
    m: 24,
    s: 20,
  };

  const buttonSize: { [key: string]: TButton.Variants["size"] } = {
    l: "l",
    m: "m",
    s: "s",
  };

  return (
    <div className={slots.wrapper()}>
      <div className={slots.contentWrapper()}>
        {icon ? (
          <div className={slots.iconWrapper()}>
            <Icon {...icon} size={iconSize[props.size || "m"]} className={cn(icon.className, slots.icon())} />
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          <Typography className={slots.title()}>{title}</Typography>
          {description ? <Typography className={slots.description()}>{description}</Typography> : null}
          {children ? (
            <Typography as={"div"} className={slots.description()}>
              {children}
            </Typography>
          ) : null}
        </div>
      </div>
      {button ? <Button size={buttonSize[props.size || "medium"]} {...button} /> : null}
      {customButton}
    </div>
  );
}
