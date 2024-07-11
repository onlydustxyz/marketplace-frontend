import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Avatar } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";

import { CardProjectPort } from "../../card-project.types";
import { CardProjectDefaultVariants } from "./default.variants";

export function CardProjectDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  avatarProps,
  title,
  description,
  topTags,
  paperProps = {},
  bottomTags = [],
  primaryAction,
  secondaryAction,
  ...props
}: CardProjectPort<C>) {
  const { ...htmlProps } = props;
  const slots = CardProjectDefaultVariants();

  return (
    <Paper
      border={"none"}
      container={"1"}
      as={as}
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
      {...paperProps}
      {...htmlProps}
    >
      <div className="flex w-fit items-center justify-center">
        <Avatar size={"xxl"} shape="square" {...avatarProps} />
      </div>
      <div className={"flex flex-col justify-between gap-1"}>
        <div className={"flex flex-row items-center justify-between"}>
          <Typo size={"m"} weight="medium" as={"div"}>
            {title}
          </Typo>
          <div className="flex w-full flex-1 justify-end gap-1">
            {topTags?.map((t, key) => (
              <Tag key={key} size={"xs"} shape={"round"} style={"outline"} color="blue" {...t} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <Typo size={"xxs"} as={"div"} color="text-2">
            {description}
          </Typo>
        </div>
        <div className="flex w-full flex-row items-center justify-between pt-2">
          <div className="flex items-center justify-start gap-1">
            {bottomTags?.map((t, key) => (
              <Tag key={key} size={"xs"} shape={"round"} style={"outline"} color="grey" {...t} />
            ))}
          </div>
          <div className="flex items-center justify-end gap-1">
            {!!secondaryAction && <Button variant="secondary-light" size={"s"} {...primaryAction} />}
            {!!primaryAction && <Button variant="primary" size={"s"} {...primaryAction} />}
          </div>
        </div>
      </div>
    </Paper>
  );
}
