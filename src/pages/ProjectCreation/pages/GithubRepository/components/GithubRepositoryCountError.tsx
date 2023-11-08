import Lightbulb from "src/assets/icons/Lightbulb";
import { useIntl } from "src/hooks/useIntl";

export const GithubRepositoryCountError = () => {
  const { T } = useIntl();
  return (
    <div className="flex h-auto items-center justify-start gap-1 rounded-full border border-card-border-light bg-card-background-light px-3 py-[6px]">
      <Lightbulb className="h-4 w-4 fill-orange-500" />
      <p className="text-body-s text-orange-500">{T("project.details.create.repository.form.error_count")}</p>
    </div>
  );
};
