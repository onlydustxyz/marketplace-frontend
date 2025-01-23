import { NotificationReactQueryAdapter } from "core/application/react-query-adapter/notification";
import { NotificationStatus } from "core/domain/notification/notification-constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InView } from "react-intersection-observer";

import { Spinner } from "src/components/Spinner/Spinner";
import { viewportConfig } from "src/config";

import { Badge } from "components/atoms/badge";
import { Button } from "components/atoms/button/variants/button-default";
import { Popover } from "components/atoms/popover";
import { Typo } from "components/atoms/typo";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { NotificationItem } from "components/features/notification-button/components/notification-item/notification-item";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Modal } from "components/molecules/modal";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

function Loading() {
  return (
    <div className="flex w-full flex-col gap-2">
      <SkeletonEl width="100%" height={66} variant={"rounded"} />
      <SkeletonEl width="100%" height={66} variant={"rounded"} />
      <SkeletonEl width="100%" height={66} variant={"rounded"} />
    </div>
  );
}

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
  const router = useRouter();
  const isSm = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    NotificationReactQueryAdapter.client.useGetNotifications({});

  const { mutateAsync: readNotifications } = NotificationReactQueryAdapter.client.useUpdateNotifications({});
  const { mutateAsync: readAllNotifications } = NotificationReactQueryAdapter.client.useReadAllNotifications({});

  const notifications = data?.pages.flatMap(page => page.notifications) || [];

  async function handleReadAll() {
    await readAllNotifications({});
    onClose();
  }

  async function handleRead(notificationId: string, url?: string) {
    await readNotifications({
      notifications: [{ id: notificationId, status: NotificationStatus.READ }],
    });

    onClose();

    if (url) {
      router.push(url);
    }
  }

  return (
    <ScrollView className="max-h-[350px]">
      <div className="flex w-full max-w-full flex-col gap-2 overflow-hidden px-2 sm:w-[418px]">
        {!isSm && (
          <div className="flex flex-row items-center justify-between gap-1">
            <Typo size={"xl"} weight={"medium"} translate={{ token: "v2.features.notifications.title" }} />
            <div className="flex flex-row items-center justify-end gap-2">
              <Button
                size={"l"}
                variant="secondary-light"
                onClick={handleReadAll}
                translate={{ token: "v2.features.notifications.readAll" }}
              />
              <Button
                size={"l"}
                hideText={true}
                startIcon={{ remixName: "ri-close-line" }}
                variant="secondary-light"
                onClick={onClose}
              />
            </div>
          </div>
        )}
        {!isLoading ? (
          <>
            {notifications?.length ? (
              <div className="flex w-full flex-col gap-2">
                {notifications.map(notification =>
                  notification ? (
                    <NotificationItem key={notification.getId()} notification={notification} onClick={handleRead} />
                  ) : null
                )}
                {hasNextPage && (
                  <div className="pt-2">
                    <InView
                      className="flex h-10 w-full justify-center"
                      onChange={inView => {
                        if (inView) fetchNextPage();
                      }}
                    >
                      {isFetchingNextPage ? <Spinner /> : null}
                    </InView>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex w-full flex-col items-center gap-1  py-4">
                <Typo variant="brand" translate={{ token: "v2.features.notifications..empty.title" }} />
                <Typo size="s" translate={{ token: "v2.features.notifications..empty.content" }} />
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </ScrollView>
  );
}

export function NotificationButton() {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const isSm = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);
  const { data: unreadNotificationCount } = NotificationReactQueryAdapter.client.useGetNotificationsCount({
    queryParams: { status: NotificationStatus.UNREAD },
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
      <Popover.Content className={"bg-container-1 p-3 px-1"}>
        {({ setIsOpen, isOpen }) => <>{isOpen ? <Content onClose={() => setIsOpen(false)} /> : null}</>}
      </Popover.Content>
    </Popover>
  );
}
