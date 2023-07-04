import Card from "src/components/Card";
import GithubLink from "src/pages/ProjectDetails/Overview/GithubRepoDetails/GithubLink";
import { useIntl } from "src/hooks/useIntl";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import { GithubRepoFragment } from "src/__generated/graphql";

type Props = GithubRepoFragment;

export default function View({ id, name, htmlUrl, description, stars, forkCount }: Props) {
  const { T } = useIntl();

  return (
    <Card dataTestId={`github-repo-${id}`} className="flex flex-row justify-between p-3" padded={false} blurred={false}>
      <div className="flex w-5/6 flex-col justify-between gap-5 p-3 pt-5 font-walsheim font-normal text-greyscale-50">
        <div className="flex flex-col justify-start gap-2">
          <span className="text-base font-medium">{name}</span>
          <span className={`line-clamp-2 text-sm text-greyscale-200 ${!description && "italic"}`}>
            {description || T("project.details.overview.repositories.descriptionPlaceholder")}
          </span>
        </div>
        <div className="flex flex-row gap-5 text-sm font-medium text-greyscale-200">
          <div className="flex flex-row gap-1">
            <StarLine />
            {stars}
          </div>
          <div className="flex flex-row items-center gap-1">
            <ForkLine className="fill-greyscale-200" />
            {forkCount}
          </div>
        </div>
      </div>
      <GithubLink link={htmlUrl} />
    </Card>
  );
}
