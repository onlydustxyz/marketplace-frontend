import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button, { ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

export function MissingGithubAppInstall({ slug = "" }: { slug: string }) {
  const { T } = useIntl();

  return (
    <div className="bg-oritems-center flex items-center justify-between gap-3 rounded-2xl bg-orange-800 p-3">
      <p className="font-walsheim text-sm font-medium text-white">{T("project.missingGithubAppInstall.message")}</p>

      <Link to={generatePath(RoutePaths.ProjectDetailsEditRepos, { projectKey: slug })}>
        <Button size={ButtonSize.Sm} className="whitespace-nowrap">
          {T("project.missingGithubAppInstall.button")}
        </Button>
      </Link>
    </div>
  );
}
