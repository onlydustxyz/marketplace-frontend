import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";

import Button, { ButtonAccentColor, ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

import { NEXT_ROUTER } from "constants/router";

export function MissingGithubAppInstall({ slug = "" }: { slug: string }) {
  const { T } = useIntl();
  const router = useRouter();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(NEXT_ROUTER.projects.details.edit(slug));
  };

  return (
    <div className="bg-oritems-center flex items-center justify-between gap-3 rounded-2xl bg-orange-800 p-3">
      <p className="font-walsheim text-sm font-medium text-white">{T("project.missingGithubAppInstall.message")}</p>

      <Button
        size={ButtonSize.Sm}
        className="whitespace-nowrap"
        type={ButtonType.Secondary}
        accentColor={ButtonAccentColor.Orange}
        onClick={handleClick}
      >
        {T("project.missingGithubAppInstall.button")}
      </Button>
    </div>
  );
}
