import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TProjectMissingGithubBanner } from "./project-missing-github-banner.types";

export function ProjectMissingGithubBanner({ slug = "" }: TProjectMissingGithubBanner.Props) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-orange-800 p-3">
      <Typography variant="body-s-bold" className="text-white">
        <Translate token="v2.features.banners.missingGithubAppInstall.message" />
      </Typography>

      <BaseLink href={NEXT_ROUTER.projects.details.edit(slug)}>
        <Button size="s" className="whitespace-nowrap" variant="secondary" accentColor="orange">
          <Translate token="v2.features.banners.missingGithubAppInstall.button" />
        </Button>
      </BaseLink>
    </div>
  );
}
