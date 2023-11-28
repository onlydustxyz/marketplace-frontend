import { escapeRegExp, filter } from "lodash";
import { WorkItemType } from "src/__generated/graphql";
import { RewardableItem } from "src/api/Project/queries";

type Props = {
  pattern?: string;
  contributions: RewardableItem[];
};

export default function useFilteredContributions({ pattern = "", contributions }: Props) {
  const searchRegExps = pattern
    .split(" ")
    .map(str => str.trim())
    .filter(str => str.length > 0)
    .map(str => new RegExp(escapeRegExp(str), "i"));

  return filter(contributions, (contribution: RewardableItem) => {
    if (!contribution.id) return;

    const types = {
      [WorkItemType.Issue]: contribution.type === WorkItemType.Issue ? contribution : undefined,
      [WorkItemType.PullRequest]: contribution.type === WorkItemType.PullRequest ? contribution : undefined,
      [WorkItemType.CodeReview]: contribution.type === WorkItemType.CodeReview ? contribution : undefined,
    };

    const contributionType = types[contribution?.type as WorkItemType];

    const contributionFullText = contributionType?.number?.toString() + " " + contributionType?.title;
    return searchRegExps.filter(regexp => !regexp.test(contributionFullText)).length === 0;
  });
}
