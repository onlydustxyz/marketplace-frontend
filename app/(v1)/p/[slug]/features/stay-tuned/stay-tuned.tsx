import { bootstrap } from "core/bootstrap";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import Link from "next/link";
import { useMemo } from "react";

import { TStayTuned } from "app/(v1)/p/[slug]/features/stay-tuned/stay-tuned.types";
import { useGoodFirstIssuesNotification } from "app/(v1)/p/[slug]/hooks/use-good-first-issue-notification";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { Card } from "components/ds/card/card";
import { SocialIconLink } from "components/features/social-icon-link/social-icon-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function StayTuned({ projectId, moreInfos }: TStayTuned.Props) {
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { isNotificationEnabled, handleSetMyNotificationSettings } = useGoodFirstIssuesNotification({ projectId });

  const communityLinkPatterns = ["t.me", "discord.com"];
  const urlHelperPort = bootstrap.getUrlHelperPort();

  const communityLinks = useMemo(() => {
    return moreInfos?.filter(link => communityLinkPatterns.some(pattern => link.url.includes(pattern)));
  }, [moreInfos]);

  if (!communityLinks?.length && !isAuthenticated) {
    return null;
  }

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
              return link.value && validUrl ? (
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
              ) : null;
            })}
          </div>
        </div>
      </Flex>
    </Card>
  );
}
