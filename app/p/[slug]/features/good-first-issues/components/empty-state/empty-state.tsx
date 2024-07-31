import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

import { useGoodFirstIssuesNotification } from "app/p/[slug]/hooks/use-good-first-issue-notification";

import { IMAGES } from "src/assets/img";
import { viewportConfig } from "src/config";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import { TEmptyState } from "./empty-state.types";

export function EmptyState({ projectId }: TEmptyState.Props) {
  const { T } = useIntl();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { isNotificationEnabled, handleSetMyNotificationSettings } = useGoodFirstIssuesNotification({ projectId });

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  return (
    <Flex direction="col" alignItems="center" className="gap-6 px-6 pb-12 pt-4">
      <Flex direction="col" alignItems="center" className="gap-4">
        <Image src={IMAGES.global.categories} width={80} height={80} alt={T("emptyStatePictureFallback")} />

        <Flex direction="col" className="gap-1">
          <Typography
            variant={isMd ? "title-m" : "title-s"}
            className="text-center"
            translate={{ token: "v2.pages.project.overview.goodFirstIssues.empty.title" }}
          />

          <Typography variant="body-s" className="text-center text-spaceBlue-200">
            <Translate
              token={
                isAuthenticated
                  ? "v2.pages.project.overview.goodFirstIssues.empty.descriptionAuthenticated"
                  : "v2.pages.project.overview.goodFirstIssues.empty.descriptionAnonymous"
              }
            />
          </Typography>
        </Flex>
      </Flex>

      {isAuthenticated ? (
        <Paper container="4" border="none" classNames={{ base: "flex gap-2 items-center px-4 py-6" }}>
          <Switch isActive={isNotificationEnabled} onChange={handleSetMyNotificationSettings} />
          <Typography
            variant="body-s-bold"
            translate={{ token: "v2.pages.project.overview.stayTuned.notifySwitchLabel" }}
          />
        </Paper>
      ) : (
        <Button
          as={BaseLink}
          htmlProps={{
            href: NEXT_ROUTER.signup.root,
          }}
        >
          <Translate token={"v2.pages.project.overview.goodFirstIssues.empty.connectToFillForm"} />
        </Button>
      )}
    </Flex>
  );
}
