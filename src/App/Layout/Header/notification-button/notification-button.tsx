import { NotificationReactQueryAdapter } from "core/application/react-query-adapter/notification";

import { Badge } from "components/atoms/badge";
import { Button } from "components/atoms/button/variants/button-default";
import { Popover } from "components/atoms/popover";
import { Typo } from "components/atoms/typo";

export function NotificationButton() {
  const { data } = NotificationReactQueryAdapter.client.useGetNotificationsCount({ queryParams: { status: "UNREAD" } });
  const hasUnreadNotifications = !!data?.count;

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div className="relative">
            <Button
              as={"div"}
              size={"xl"}
              hideText={true}
              startIcon={{ remixName: hasUnreadNotifications ? "ri-notification-3-fill" : "ri-notification-3-line" }}
              variant="secondary-light"
            />
            {hasUnreadNotifications && (
              <Badge
                size="s"
                colors="brand-2"
                classNames={{ base: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 pointer-events-none" }}
              >
                {data?.count}
              </Badge>
            )}
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content className={"bg-container-1 p-3"}>
        {({ setIsOpen }) => (
          <div className="flex w-[418px] flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-1">
              <Typo size={"xl"} weight={"medium"} translate={{ token: "v2.features.notifications.title" }} />
              <Button
                size={"l"}
                hideText={true}
                startIcon={{ remixName: "ri-close-line" }}
                variant="secondary-light"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
