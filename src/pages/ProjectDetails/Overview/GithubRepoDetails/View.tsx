import Card from "src/components/Card";
import GithubLink from "src/pages/ProjectDetails/Overview/GithubRepoDetails/GithubLink";
import { useIntl } from "src/hooks/useIntl";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import { components } from "src/__generated/api";

type Props = {
  githubRepo?: components["schemas"]["GithubRepoResponse"];
};

export default function View({ githubRepo }: Props) {
  const { T } = useIntl();

  return (
    <Card dataTestId={`github-repo-${githubRepo?.id}`} className="flex flex-row justify-between p-3" padded={false}>
      <div className="flex w-5/6 flex-col justify-between gap-5 p-3 pt-5 font-walsheim font-normal text-greyscale-50">
        <div className="flex flex-col justify-start gap-2">
          <span className="text-base font-medium">{githubRepo?.name}</span>
          <span className={`line-clamp-2 text-sm text-greyscale-200 ${!githubRepo?.description && "italic"}`}>
            {githubRepo?.description || T("project.details.overview.repositories.descriptionPlaceholder")}
          </span>
        </div>
        <div className="flex flex-row gap-5 text-sm font-medium text-greyscale-200">
          <div className="flex flex-row gap-1">
            <StarLine />
            {githubRepo?.stars}
          </div>
          <div className="flex flex-row items-center gap-1">
            <ForkLine className="fill-greyscale-200" />
            {githubRepo?.forkCount || 0}
          </div>
        </div>
      </div>
      {githubRepo?.htmlUrl ? <GithubLink link={githubRepo?.htmlUrl} /> : null}
    </Card>
  );
}
