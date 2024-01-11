import { generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";
import Link from "next/link";
import { Button } from "components/ds/button/button";
import { TProjectMissingGithubBanner } from "./project-missing-github-banner.types";

export function ProjectMissingGithubBanner({ slug = "" }: TProjectMissingGithubBanner.Props) {
  const { T } = useIntl();

  return (
    <div className="bg-oritems-center flex items-center justify-between gap-3 rounded-2xl bg-orange-800 p-3">
      <p className="font-walsheim text-sm font-medium text-white">{T("project.missingGithubAppInstall.message")}</p>
      <Link href={generatePath(RoutePaths.ProjectDetailsEditRepos, { projectKey: slug })}>
        <Button size="s" className="whitespace-nowrap" type="secondary" accentColor="orange">
          {T("project.missingGithubAppInstall.button")}
        </Button>
      </Link>
    </div>
  );
}
