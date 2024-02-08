import Link from "next/link";
import { generatePath } from "react-router-dom";

import { RoutePaths } from "src/App";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TProjectMissingGithubBanner } from "./project-missing-github-banner.types";

export function ProjectMissingGithubBanner({ slug = "" }: TProjectMissingGithubBanner.Props) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-orange-800 p-3">
      <Typography variant="body-s-bold" className="text-white">
        <Translate token="v2.features.banners.missingGithubAppInstall.message" />
      </Typography>

      <Link href={generatePath(RoutePaths.ProjectDetailsEditRepos, { projectKey: slug })}>
        <Button size="s" className="whitespace-nowrap" variant="secondary" accentColor="orange">
          <Translate token="v2.features.banners.missingGithubAppInstall.button" />
        </Button>
      </Link>
    </div>
  );
}
