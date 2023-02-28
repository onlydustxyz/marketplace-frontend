import { gql } from "@apollo/client";
import Card from "src/components/Card";
import GithubLink from "src/components/GithubLink";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import ForkLine from "src/icons/ForkLine";
import StarLine from "src/icons/StarLine";
import { getMostUsedLanguages } from "src/utils/languages";
import { buildGithubLink } from "src/utils/stringUtils";
import { GithubRepoDynamicDetailsFragment, GithubRepoStaticDetailsFragment } from "src/__generated/graphql";

type Props = Omit<GithubRepoStaticDetailsFragment & GithubRepoDynamicDetailsFragment, "__typename">;

export default function View({ owner, name, description, languages, stars, forksCount }: Props) {
  return (
    <Card className="flex flex-col gap-3 font-walsheim text-greyscale-50 font-normal relative p-6" padded={false}>
      {owner && name && (
        <div className="absolute top-3 right-3">
          <GithubLink link={buildGithubLink(owner, name)} />
        </div>
      )}
      {Object.keys(languages).length > 0 && (
        <div className="w-fit flex flex-row border border-greyscale-50/8 px-2 py-1 rounded-full gap-1 text-xs items-center">
          <CodeSSlashLine />
          {getMostUsedLanguages(languages, 1)[0]}
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-medium text-base">{name}</span>
        <span className="my-2 text-greyscale-200 text-sm">{description}</span>
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
