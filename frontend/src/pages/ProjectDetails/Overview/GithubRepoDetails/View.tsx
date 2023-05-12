import Card from "src/components/Card";
import GithubLink from "src/pages/ProjectDetails/Overview/GithubRepoDetails/GithubLink";
import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import { getMostUsedLanguages } from "src/utils/languages";
import { GithubRepoFragment } from "src/__generated/graphql";
import { LanguageMap } from "src/types";

type Props = GithubRepoFragment & { languages: LanguageMap };

export default function View({ id, name, htmlUrl, description, languages, stars, forkCount }: Props) {
  const { T } = useIntl();

  return (
    <Card dataTestId={`github-repo-${id}`} className="flex flex-row justify-between p-3" padded={false} blurred={false}>
      <div className="flex flex-col justify-between font-walsheim text-greyscale-50 font-normal p-3 w-5/6 gap-5">
        <div className="flex flex-col gap-2 justify-start">
          {Object.keys(languages).length > 0 && (
            <Tag size={TagSize.Small}>
              <CodeSSlashLine />
              {getMostUsedLanguages(languages, 1)[0]}
            </Tag>
          )}
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
