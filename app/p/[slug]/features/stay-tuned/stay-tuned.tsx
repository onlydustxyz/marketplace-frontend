import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { bootstrap } from "core/bootstrap";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { TStayTuned } from "app/p/[slug]/features/stay-tuned/stay-tuned.types";

import useMutationAlert from "src/api/useMutationAlert";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { Card } from "components/ds/card/card";
import { SocialIconLink } from "components/features/social-icon-link/social-icon-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function StayTuned({ projectId, moreInfo }: TStayTuned.Props) {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: myNotificationSettings } = UserReactQueryAdapter.client.useGetMyNotificationsSettings({
    pathParams: {
      projectId,
    },
    options: {
      enabled: isAuthenticated,
    },
  });

  useEffect(() => {
    if (myNotificationSettings) {
      setIsNotificationEnabled(myNotificationSettings.onGoodFirstIssueAdded);
    }
  }, [myNotificationSettings]);

  const { mutateAsync: setMyNotificationSettings, ...restSetMyNotificationSettings } =
    UserReactQueryAdapter.client.useSetMyNotificationsSettings({ pathParams: { projectId } });

  useMutationAlert({
    mutation: restSetMyNotificationSettings,
    error: {
      default: true,
    },
  });

  async function handleSetMyNotificationSettings() {
    await setMyNotificationSettings({
      onGoodFirstIssueAdded: !isNotificationEnabled,
    });
  }

  const communityLinkPatterns = ["t.me", "discord.com"];
  const urlHelperPort = bootstrap.getUrlHelperPort();

  const communityLinks = useMemo(() => {
    return moreInfo?.filter(link => communityLinkPatterns.some(pattern => link.url.includes(pattern)));
  }, [moreInfo]);

  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="divide-y divide-greyscale-50/8">
        <Flex alignItems="center" className="gap-2 px-6 py-4">
          <Icon remixName="ri-notification-3-line" size={20} />

          <Typography variant="body-m-bold" translate={{ token: "v2.pages.project.overview.stayTuned.title" }} />
        </Flex>
        <div className="flex flex-col gap-4 px-6 py-4">
          <Typography
            variant="body-s"
            className={"text-spaceBlue-200"}
            translate={{ token: "v2.pages.project.overview.stayTuned.description" }}
          />
          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <Paper container="4" border="none" classNames={{ base: "flex gap-2 items-center px-4 py-2" }}>
                <Switch isActive={isNotificationEnabled} onChange={handleSetMyNotificationSettings} />
                <Typography
                  variant="body-s-bold"
                  translate={{ token: "v2.pages.project.overview.stayTuned.notifySwitchLabel" }}
                />
              </Paper>
            ) : null}
            {communityLinks?.map(link => {
              const validUrl = link.url ? urlHelperPort.validateUrl(link.url) : "";
              return (
                <Button
                  key={link.url}
                  as={Link}
                  htmlProps={{ href: validUrl, target: "_blank" }}
                  variant="secondary-light"
                  size="m"
                  startContent={<SocialIconLink url={validUrl} />}
                  classNames={{ base: "w-full", content: "justify-start" }}
                >
                  {link.value}
                </Button>
              );
            })}
          </div>
        </div>
      </Flex>
    </Card>
  );
}
