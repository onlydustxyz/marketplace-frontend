export enum ApiResourcePaths {
  GET_MY_REWARD_ITEMS_BY_ID = "/api/v1/me/rewards/{{id}}/reward-items",
  PROJECT_REWARD = "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}",
  GET_PROJECT_REWARD_ITEMS = "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}/reward-items",
  GET_PROJECT_BUDGETS = "/api/v1/projects/{{projectId}}/budgets",
  PROJECT_REWARDS = "/api/v1/projects/{{id}}/rewards",
}
