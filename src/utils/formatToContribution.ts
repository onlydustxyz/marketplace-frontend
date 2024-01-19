import { RewardableItem } from "src/api/Project/queries.ts";
import { RewardItem } from "src/hooks/useInfiniteRewardItems.tsx";

/**
 * Converts a rewardable item to a contribution
 * @param rewardableItem
 */

export function rewardableItemToContribution(rewardableItem: RewardableItem) {
  return {
    // TODO get author info
    githubAuthor: {
      avatarUrl: "",
      githubUserId: 0,
      htmlUrl: "",
      login: "",
    },
    githubBody: "", // TODO get this from the API
    githubHtmlUrl: rewardableItem.htmlUrl,
    githubNumber: rewardableItem.number,
    githubStatus: rewardableItem.status,
    githubTitle: rewardableItem.title,
    type: rewardableItem.type,
  };
}

/**
 * Converts a reward item to a contribution
 * @param rewardItem
 */
export function rewardItemToContribution(rewardItem: RewardItem) {
  return {
    githubAuthor: {
      avatarUrl: rewardItem.authorAvatarUrl ?? "",
      githubUserId: rewardItem.githubAuthorId ?? 0,
      htmlUrl: rewardItem.authorGithubUrl ?? "",
      login: rewardItem.authorLogin ?? "",
    },
    githubBody: "", // TODO get this from the API
    githubHtmlUrl: rewardItem.githubUrl,
    githubNumber: rewardItem.number,
    githubStatus: rewardItem.status,
    githubTitle: rewardItem.title,
    type: rewardItem.type,
  };
}
