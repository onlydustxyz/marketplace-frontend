import CheckLine from "src/icons/CheckLine";

import { useIntl } from "hooks/translate/use-translate";

export const GithubRepositoryCount = ({ selected, total }: { selected: number; total: number }) => {
  const { T } = useIntl();
  return (
    <div className="flex h-auto items-center justify-start gap-1 rounded-full border border-card-border-light bg-card-background-light px-3 py-[6px]">
      <CheckLine className="flex h-4 w-4 items-center justify-center fill-white" />
      <p className="text-body-s">{T("project.details.create.repository.form.counter", { selected, total })}</p>
    </div>
  );
};
