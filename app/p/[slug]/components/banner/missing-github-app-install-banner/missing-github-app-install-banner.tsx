import { Banner } from "components/ds/banner/banner";
import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TMissingGithubAppInstallBanner } from "./missing-github-app-install-banner.types";

export function MissingGithubAppInstallBanner({ slug, organizations }: TMissingGithubAppInstallBanner.Props) {
  return (
    <Banner
      title={<Translate token="v2.features.banners.missingGithubAppInstall.message" />}
      variant="orange"
      hasBorder
      icon={{ remixName: "ri-information-line", className: "text-orange-500" }}
      size="s"
      endElement={
        <BaseLink href={NEXT_ROUTER.projects.details.edit(slug)}>
          <Button size="s" variant="secondary" accentColor="orange" className="whitespace-nowrap">
            <Translate token="v2.features.banners.missingGithubAppInstall.button" />
          </Button>
        </BaseLink>
      }
    >
      {organizations?.length ? (
        <ul className="list-inside list-disc">
          {organizations.map(({ githubUserId, name, login }) => (
            <Typography as="li" variant="body-s" key={githubUserId}>
              {name || login}
            </Typography>
          ))}
        </ul>
      ) : null}
    </Banner>
  );
}
