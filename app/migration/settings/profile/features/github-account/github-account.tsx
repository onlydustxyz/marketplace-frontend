"use client";

import MeApi from "src/api/me";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

// TODO: Change Button with link using the new library
export function ProfileGithubAccount() {
  const { T } = useIntl();

  const { data } = MeApi.queries.useGetMe({});

  const { login, avatarUrl, email } = data || {};

  return (
    <Card>
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography
            variant="title-s"
            translate={{
              token: "settings.publicProfile.githubAccount.title",
            }}
          />
          <Typography
            variant="body-s"
            translate={{
              token: "settings.publicProfile.githubAccount.subtitle",
            }}
            className="text-spaceBlue-200"
          />
        </Flex>

        <Flex alignItems="center" className="gap-3" justifyContent="between">
          <Flex alignItems="center" className="gap-3">
            {avatarUrl && (
              <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={T("profile.avatar")} />
            )}

            <Flex direction="col">
              <Typography variant="title-s" className="text-sm leading-4">
                {login}
              </Typography>
              <Typography variant="body-s" className="text-spaceBlue-200">
                {email}
              </Typography>
            </Flex>
          </Flex>

          <a href="https://github.com/settings/profile" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="s">
              <Icon remixName="ri-github-fill" />
              <Translate token="settings.publicProfile.githubAccount.button" />
            </Button>
          </a>
        </Flex>
      </Flex>
    </Card>
  );
}
