import { escapeRegExp, filter } from "lodash";
import { ContributionFragment } from "src/__generated/graphql";

type Props = {
  pattern?: string;
  contributions: ContributionFragment[];
};

export default function useFilteredContributions({ pattern = "", contributions }: Props) {
  const searchRegExps = pattern
    .split(" ")
    .map(str => str.trim())
    .filter(str => str.length > 0)
    .map(str => new RegExp(escapeRegExp(str), "i"));

  return filter(contributions, (contribution: ContributionFragment) => {
    if (!contribution.id) return;
    // const contributionFullText = contribution.number.toString() + " " + contribution.title;
    const contributionFullText = contribution.id;
    return searchRegExps.filter(regexp => !regexp.test(contributionFullText)).length === 0;
  });
}
