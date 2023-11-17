import Button, { ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

export function MissingGithubAppInstall({ slug }: { slug: string }) {
  const { T } = useIntl();

  return (
    <div className="bg-oritems-center flex items-center justify-between gap-3 rounded-2xl bg-orange-800 p-3">
      <p className="font-walsheim text-sm font-medium text-white">{T("project.missingGithubAppInstall.message")}</p>

      <Button size={ButtonSize.Sm} className="whitespace-nowrap">
        {T("project.missingGithubAppInstall.button")}
      </Button>
    </div>
  );
}
