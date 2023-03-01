import { gql } from "@apollo/client";
import Card from "src/components/Card";
import GithubLink from "src/components/GithubLink";
import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import { getMostUsedLanguages } from "src/utils/languages";
import { buildGithubLink } from "src/utils/stringUtils";
import { GithubRepoDynamicDetailsFragment, GithubRepoStaticDetailsFragment } from "src/__generated/graphql";

type Props = Omit<GithubRepoStaticDetailsFragment & GithubRepoDynamicDetailsFragment, "__typename">;

export default function View({ owner, name, description, languages, stars, forksCount }: Props) {
  const { T } = useIntl();
  return (
    <Card className="flex flex-row justify-between p-3" padded={false}>
      <div className="flex flex-col justify-between gap-3 font-walsheim text-greyscale-50 font-normal p-3 w-5/6">
        {Object.keys(languages).length > 0 && (
          <Tag size={TagSize.Small}>
            <CodeSSlashLine />
            {getMostUsedLanguages(languages, 1)[0]}
          </Tag>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-base">{name}</span>
          <span className="my-2 text-greyscale-200 text-sm line-clamp-2">
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
            {forksCount}
          </div>
        </div>
      </div>
      <div>{owner && name && <GithubLink link={buildGithubLink(owner, name)} />}</div>
    </Card>
  );
}

export const GITHUB_REPO_STATIC_DETAILS_FRAGMENT = gql`
  fragment GithubRepoStaticDetails on GithubRepoDetails {
    id
    owner
    name
    languages
  }
`;

export const GITHUB_REPO_DYNAMIC_DETAILS_FRAGMENT = gql`
  fragment GithubRepoDynamicDetails on Repository {
    id
    description
    stars
    forksCount
  }
`;
