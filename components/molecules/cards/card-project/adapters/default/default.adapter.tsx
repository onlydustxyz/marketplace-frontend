import { ElementType, useMemo } from "react";

import { cn } from "src/utils/cn";

import { Avatar } from "components/atoms/avatar";
import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Tooltip } from "components/atoms/tooltip";
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
  primaryActionProps,
  secondaryActionProps,
  maxBottomTags,
  htmlProps,
}: CardProjectPort<C>) {
  const Component = as || "div";
  const slots = CardProjectDefaultVariants();

  const renderBottomTags = useMemo(() => {
    if (!bottomTags.length) {
      return null;
    }

    if (maxBottomTags) {
      const nbBottomTags = bottomTags.length || 0;
      const reachedMaxBottomTags = nbBottomTags > maxBottomTags;
      const bottomTagsToDisplay = bottomTags.slice(0, maxBottomTags);

      return (
        <Tooltip
          content={
            <ul className="flex flex-col gap-1">
              {bottomTags.map((t, key) => (
                <li key={key}>
                  <Typo size="xs">{t.children}</Typo>
                </li>
              ))}
            </ul>
          }
        >
          <Tag size={"xs"} shape={"round"} style={"outline"} color="grey" {...bottomTagsToDisplay[0]}>
            {bottomTagsToDisplay.map(t => t.children).join(", ")}
            {reachedMaxBottomTags ? ` +${nbBottomTags - maxBottomTags}` : ""}
          </Tag>
        </Tooltip>
      );
    }

    return bottomTags.map((t, key) => (
      <Tag key={key} size={"xs"} shape={"round"} style={"outline"} color="grey" {...t} />
    ));
  }, [bottomTags, maxBottomTags]);

  return (
    <Paper
      border={"none"}
      container={"1"}
      as={Component}
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
      {...paperProps}
      htmlProps={htmlProps}
    >
      <div className="flex w-fit">
        <Avatar size={"xxl"} shape="square" {...avatarProps} />
      </div>

      <div className={"flex w-full flex-col justify-between gap-1"}>
        <div className="flex flex-col gap-1">
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

          {!!description && (
            <div className="line-clamp-3 w-full md:line-clamp-2">
              <Typo size={"xxs"} as={"div"} color="text-2">
                {description}
              </Typo>
            </div>
          )}
        </div>

        <div className="flex w-full flex-row items-end justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center justify-start gap-1">{renderBottomTags}</div>

          <div className="flex items-center justify-end gap-1 whitespace-nowrap">
            {!!secondaryActionProps && <Button variant="secondary-light" size={"s"} {...secondaryActionProps} />}
            {!!primaryActionProps && <Button variant="primary" size={"s"} {...primaryActionProps} />}
          </div>
        </div>
      </div>
    </Paper>
  );
}
