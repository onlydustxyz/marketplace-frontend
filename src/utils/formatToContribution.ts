import { RewardableItem } from "src/api/Project/queries";
import { RewardItem } from "src/hooks/useInfiniteRewardItems";

/**
 * Converts a rewardable item to a contribution
 * @param rewardableItem
 */

export function rewardableItemToContribution(rewardableItem: RewardableItem) {
  return {
    id: rewardableItem.id,
    githubAuthor: {
      avatarUrl: rewardableItem.author?.avatarUrl ?? "",
      githubUserId: rewardableItem.author?.githubUserId ?? 0,
      login: rewardableItem.author?.login ?? "",
    },
    githubBody: rewardableItem.githubBody,
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
    id: rewardItem.id,
    githubAuthor: {
      avatarUrl: rewardItem.authorAvatarUrl ?? "",
      githubUserId: rewardItem.githubAuthorId ?? 0,
      htmlUrl: rewardItem.authorGithubUrl ?? "",
      login: rewardItem.authorLogin ?? "",
    },
    githubBody: rewardItem.githubBody,
    githubHtmlUrl: rewardItem.githubUrl,
    githubNumber: rewardItem.number,
    githubStatus: rewardItem.status,
    githubTitle: rewardItem.title,
    type: rewardItem.type,
  };
}
