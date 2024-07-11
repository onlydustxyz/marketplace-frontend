import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";
import { getComponentsVariants } from "components/molecules/cards/card-event/card-event.utils";

import { CardEventPort } from "../../card-event.types";
import { CardEventDefaultVariants } from "./default.variants";

export function CardEventDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  display = "planned",
  title,
  titleIcon,
  secondaryAction,
  primaryAction,
  tag,
  text,
  ...props
}: CardEventPort<C>) {
  const { ...htmlProps } = props;
  const slots = CardEventDefaultVariants({ display });
  const variants = getComponentsVariants(display);

  return (
    <Paper as={as} classNames={{ base: cn(slots.base(), classNames?.base) }} {...htmlProps}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full flex-row items-center justify-between gap-1">
          <div className="flex flex-row items-center justify-start gap-1">
            {!!titleIcon && <Icon size={16} {...titleIcon} />}
            <Typo size={"m"} variant={"brand"} as={"div"}>
              {title}
            </Typo>
          </div>
          <div>{!!tag && <Tag size={"xs"} shape={"round"} style={"outline"} color={variants.tagColor} {...tag} />}</div>
        </div>
        <Typo size={"xxs"} as={"div"} color="text-2">
          {text}
        </Typo>
      </div>
      <div className="flex w-full flex-row items-center justify-start gap-1">
        {!!secondaryAction && <Button variant={variants.buttonVariant} size={"m"} {...primaryAction} />}
        {!!primaryAction && <Button variant={variants.buttonVariant} size={"m"} {...primaryAction} />}
      </div>
    </Paper>
  );
}
