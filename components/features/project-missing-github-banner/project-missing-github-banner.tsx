import { generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import Link from "next/link";
import { Button } from "components/ds/button/button";
import { TProjectMissingGithubBanner } from "./project-missing-github-banner.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function ProjectMissingGithubBanner({ slug = "" }: TProjectMissingGithubBanner.Props) {
  return (
    <div className="bg-oritems-center flex items-center justify-between gap-3 rounded-2xl bg-orange-800 p-3">
      <Typography variant="body-s-bold" className="text-white">
        <Translate token="project.missingGithubAppInstall.message" />
      </Typography>

      <Link href={generatePath(RoutePaths.ProjectDetailsEditRepos, { projectKey: slug })}>
        <Button size="s" className="whitespace-nowrap" type="secondary" accentColor="orange">
          <Translate token="project.missingGithubAppInstall.button" />
        </Button>
      </Link>
    </div>
  );
}
