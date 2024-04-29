import { components } from "src/__generated/api";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonAccentColor, ButtonSize, ButtonType } from "src/components/Button";

import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export function MissingGithubAppInstallBanner({
  slug = "",
  orgs = [],
}: {
  slug: string;
  orgs: components["schemas"]["ProjectResponse"]["organizations"];
}) {
  const { T } = useIntl();

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-orange-500 bg-orange-900 p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-lg bg-card-background-heavy p-2 text-orange-500">
          <InfoIcon className="h-5 w-5" />
        </div>
        <div className="font-walsheim text-white">
          <p className="mb-1 font-medium">{T("project.details.banners.missingGithubAppInstall.message")}</p>
          <ul className="list-inside list-disc text-sm">
            {orgs.map(({ githubUserId, name, login }) => (
              <li key={githubUserId}>{name || login}</li>
            ))}
          </ul>
        </div>
      </div>

      <BaseLink href={NEXT_ROUTER.projects.details.edit(slug)}>
        <Button
          size={ButtonSize.Sm}
          type={ButtonType.Secondary}
          accentColor={ButtonAccentColor.Orange}
          className="whitespace-nowrap"
        >
          {T("project.details.banners.missingGithubAppInstall.button")}
        </Button>
      </BaseLink>
    </div>
  );
}
