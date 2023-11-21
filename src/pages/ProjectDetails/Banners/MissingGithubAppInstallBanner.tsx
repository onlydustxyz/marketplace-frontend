import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonAccentColor, ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

export function MissingGithubAppInstallBanner({
  slug = "",
  orgs = [],
}: {
  slug: string;
  orgs: components["schemas"]["ProjectResponse"]["organizations"];
}) {
  const { T } = useIntl();

  return (
    <div className="flex items-center justify-between gap-12 rounded-xl border border-orange-500 bg-orange-900 p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-lg bg-card-background-heavy p-2 text-orange-500">
          <InfoIcon className="h-5 w-5" />
        </div>
        <div className="font-walsheim text-white">
          <p className="mb-1 text-sm font-medium">{T("project.details.banners.missingGithubAppInstall.message")}</p>
          <ul className="list-inside list-disc text-xs">
            {orgs.map(({ id, name: org }) => (
              <li key={id}>{T("project.details.banners.missingGithubAppInstall.org", { org })}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link to={generatePath(RoutePaths.ProjectDetailsEditRepos, { projectKey: slug })}>
        <Button size={ButtonSize.Sm} type={ButtonType.Secondary} accentColor={ButtonAccentColor.Orange}>
          {T("project.details.banners.missingGithubAppInstall.button")}
        </Button>
      </Link>
    </div>
  );
}
