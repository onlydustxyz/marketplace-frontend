"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

// TODO: Change Button with link using the new library
export function ProfileGithubAccount() {
  const { user } = useAuth0();

  const onTriggerResync = () => {
    console.log("onTriggerResync");
  };

  const isRefetching = false;
  const isLoading = false;

  return (
    <Card background="base">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography
            variant="title-s"
            translate={{
              token: "v2.pages.settings.profile.githubAccount.title",
            }}
          />
          <Typography
            variant="body-s"
            translate={{
              token: "v2.pages.settings.profile.githubAccount.subtitle",
            }}
            className="text-spaceBlue-200"
          />
        </Flex>

        <Flex justifyContent="between" className="flex-col gap-3 rounded-lg bg-white/5 p-3 lg:flex-row lg:items-center">
          <Flex direction="col">
            <Typography variant="body-s-bold">{user?.nickname}</Typography>
            <Typography variant="body-s" className="text-spaceBlue-200">
              {user?.email}
            </Typography>
          </Flex>

          <Flex alignItems="center" className="gap-3">
            <Button
              variant="secondary"
              size="s"
              className={cn({
                "border-spacePurple-500 text-spacePurple-500": isRefetching || isLoading,
              })}
              onClick={onTriggerResync}
            >
              <Icon
                remixName="ri-refresh-line"
                className={cn({ "animate-spin text-spacePurple-300": isRefetching || isLoading })}
              />
              <Translate token="v2.pages.settings.profile.githubAccount.buttons.resync" />
            </Button>

            <a href="https://github.com/settings/profile" target="_blank" rel="noopener noreferrer" className="w-fit">
              <Button variant="secondary" size="s">
                <Icon remixName="ri-github-fill" />
                <Translate token="v2.pages.settings.profile.githubAccount.buttons.edit" />
              </Button>
            </a>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
