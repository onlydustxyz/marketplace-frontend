"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import MeApi from "src/api/me";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function ProfileGithubAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { refetch } = MeApi.queries.useSyncGithubAccount({
    options: { enabled: false, retry: 0 },
  });

  const onTriggerResync = async () => {
    try {
      setIsLoading(true);
      await refetch();
      await queryClient.invalidateQueries({ queryKey: MeApi.tags.user });
    } finally {
      setIsLoading(false);
    }
  };

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
            <Typography variant="body-s-bold">{user?.login}</Typography>
            <Typography variant="body-s" className="text-spaceBlue-200">
              {user?.email}
            </Typography>
          </Flex>

          <Flex alignItems="center" className="flex-col gap-3 md:flex-row">
            <Button
              variant="secondary"
              size="s"
              disabled={isLoading}
              onClick={onTriggerResync}
              className="w-full md:w-fit"
            >
              <Icon remixName="ri-refresh-line" className={cn({ "animate-spin text-spacePurple-300": isLoading })} />
              <Translate token="v2.pages.settings.profile.githubAccount.buttons.resync" />
            </Button>

            <BaseLink href="https://github.com/settings/emails" className="w-full md:w-fit">
              <Button variant="secondary" size="s" className="w-full md:w-fit">
                <Icon remixName="ri-github-fill" />
                <Translate token="v2.pages.settings.profile.githubAccount.buttons.edit" />
              </Button>
            </BaseLink>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
