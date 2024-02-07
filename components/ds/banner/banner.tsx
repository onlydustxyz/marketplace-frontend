import { cn } from "src/utils/cn";

import { bannerVariants } from "components/ds/banner/banner.variants";
import { Button } from "components/ds/button/button";
import { TButton } from "components/ds/button/button.types";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TBanner } from "./banner.types";

export function Banner({
  children,
  title,
  description,
  icon,
  button,
  customButton,
  classNames,
  ...props
}: TBanner.Props) {
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
    <div className={cn(slots.wrapper(), classNames?.wrapper)}>
      <div className={cn(slots.contentWrapper(), classNames?.contentWrapper)}>
        {icon ? (
          <div className={cn(slots.iconWrapper(), classNames?.iconWrapper)}>
            <Icon
              {...icon}
              size={iconSize[props.size || "m"]}
              className={cn(icon.className, slots.icon(), classNames?.icon)}
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          <Typography className={cn(slots.title(), classNames?.title)}>{title}</Typography>
          {description ? (
            <Typography className={cn(slots.description(), classNames?.description)}>{description}</Typography>
          ) : null}
          {children ? (
            <Typography as={"div"} className={cn(slots.description(), classNames?.description)}>
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
