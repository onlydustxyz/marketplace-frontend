import { RESSOURCE_TAGS } from "src/api/ressource-tags";

export const MIXED_TAGS = {
  me_rewards: (rewardId: string) => [RESSOURCE_TAGS.ME, "rewards", { rewardId }],
  project_rewards: (rewardId: string) => [RESSOURCE_TAGS.ME, "rewards", { rewardId }],
};
