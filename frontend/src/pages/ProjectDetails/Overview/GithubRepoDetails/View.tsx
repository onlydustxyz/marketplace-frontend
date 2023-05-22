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
      <div className="flex flex-col justify-between font-walsheim text-greyscale-50 font-normal p-3 pt-5 w-5/6 gap-5">
        <div className="flex flex-col gap-2 justify-start">
          <span className="font-medium text-base">{name}</span>
          <span className={`text-greyscale-200 text-sm line-clamp-2 ${!description && "italic"}`}>
            {description || T("project.details.overview.repositories.descriptionPlaceholder")}
          </span>
        </div>
        <div className="flex flex-row gap-5 text-greyscale-200 text-sm font-medium">
          <div className="flex flex-row gap-1">
            <StarLine />
            {stars}
          </div>
          <div className="flex flex-row gap-1 items-center">
            <ForkLine className="fill-greyscale-200" />
            {forkCount}
          </div>
        </div>
      </div>
      <GithubLink link={htmlUrl} />
    </Card>
  );
}
