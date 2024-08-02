import { NotificationReactQueryAdapter } from "core/application/react-query-adapter/notification";
import { useState } from "react";

import { NotificationItem } from "src/App/Layout/Header/notification-button/components/notification-item/notification-item";
import { viewportConfig } from "src/config";

import { Badge } from "components/atoms/badge";
import { Button } from "components/atoms/button/variants/button-default";
import { Popover } from "components/atoms/popover";
import { Typo } from "components/atoms/typo";
import { Modal } from "components/molecules/modal";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

function Trigger({
  hasUnreadNotifications,
  count,
  onClick,
}: {
  hasUnreadNotifications: boolean;
  count: number;
  onClick?: () => void;
}) {
  return (
    <div className="relative mr-2">
      <Button
        as={"div"}
        size={"xl"}
        hideText={true}
        startIcon={{ remixName: hasUnreadNotifications ? "ri-notification-3-fill" : "ri-notification-3-line" }}
        variant="secondary-light"
        onClick={onClick}
      />
      {hasUnreadNotifications && (
        <Badge
          size="s"
          colors="brand-2"
          classNames={{ base: "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 pointer-events-none" }}
        >
          {count}
        </Badge>
      )}
    </div>
  );
}

function Content({ onClose }: { onClose: () => void }) {
  const isSm = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);
  const { data: notification } = NotificationReactQueryAdapter.client.useGetNotifications({
    queryParams: { status: "UNREAD" },
  });

  return (
    <div className="flex w-full max-w-full flex-col gap-2 sm:w-[418px]">
      {!isSm && (
        <div className="flex flex-row items-center justify-between gap-1">
          <Typo size={"xl"} weight={"medium"} translate={{ token: "v2.features.notifications.title" }} />
          <Button
            size={"l"}
            hideText={true}
            startIcon={{ remixName: "ri-close-line" }}
            variant="secondary-light"
            onClick={onClose}
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-2">
        {notification?.notifications.map(notification => (
          <NotificationItem key={notification.getId()} notification={notification} onClick={onClose} />
        ))}
      </div>
    </div>
  );
}

export function NotificationButton() {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const isSm = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);
  const { data: unreadNotificationCount } = NotificationReactQueryAdapter.client.useGetNotificationsCount({
    queryParams: { status: "UNREAD" },
  });

  const hasUnreadNotifications = !!unreadNotificationCount?.count;

  if (isSm) {
    return (
      <>
        <Trigger
          hasUnreadNotifications={hasUnreadNotifications}
          count={unreadNotificationCount?.count || 0}
          onClick={() => setIsMobileModalOpen(true)}
        />
        <Modal
          titleProps={{
            translate: { token: "v2.features.notifications.title" },
          }}
          classNames={{
            backdrop: "bg-transparent",
          }}
          isOpen={isMobileModalOpen}
          onOpenChange={isModalOpen => (!isModalOpen ? setIsMobileModalOpen(false) : null)}
        >
          <Content onClose={() => setIsMobileModalOpen(false)} />
        </Modal>
      </>
    );
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Trigger hasUnreadNotifications={hasUnreadNotifications} count={unreadNotificationCount?.count || 0} />
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content className={"bg-container-1 p-3"}>
        {({ setIsOpen, isOpen }) => <>{isOpen ? <Content onClose={() => setIsOpen(false)} /> : null}</>}
      </Popover.Content>
    </Popover>
  );
}
