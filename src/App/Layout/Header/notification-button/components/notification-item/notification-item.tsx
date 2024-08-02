import { bootstrap } from "core/bootstrap";

import { BadgeDot } from "components/atoms/badge/variants/badge-dot";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";

import { TNotificationItem } from "./notification-item.types";

export function NotificationItem({ notification, onClick }: TNotificationItem.Props) {
  const dateService = bootstrap.getDateHelperPort();
  const description = notification.getDescription();
  const title = notification.getTitle();
  const time = dateService.formatDistanceToNow(new Date(notification.getTimestamp()));
  const isRead = notification.isRead();
  const url = notification.getUrl();
  const isClickable = !!url;

  return (
    <Paper
      size="s"
      container="transparent"
      classNames={{ base: "flex flex-row justify-between gap-2 items-start w-full" }}
      as={isClickable ? BaseLink : "div"}
      htmlProps={
        isClickable
          ? {
              href: url,
              onClick,
            }
          : {}
      }
    >
      <div className="relative">
        <Tag hideText={true} icon={{ remixName: "ri-square-line" }} />
        {!isRead && (
          <BadgeDot size="s" colors="brand-2" classNames={{ base: "absolute top-0 left-0  pointer-events-none" }} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Typo size="s" weight={"medium"}>
          {title}
        </Typo>
        <Typo size="xs" color={"text-2"}>
          {description}
        </Typo>
      </div>
      <Typo size="xxs" color={"text-2"}>
        {time}
      </Typo>
    </Paper>
  );
}
