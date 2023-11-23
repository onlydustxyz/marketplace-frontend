export enum ApiResourcePaths {
  GET_PROJECT_CONTRIBUTORS = "/api/v1/projects/{{id}}/contributors",
  GET_MY_REWARDS = "/api/v1/me/rewards",
  GET_MY_REWARD_BY_ID = "/api/v1/me/rewards/{{id}}",
  GET_MY_REWARD_ITEMS_BY_ID = "/api/v1/me/rewards/{{id}}/reward-items",
  GET_MY_REWARDS_AMOUNTS = "/api/v1/me/rewards/amounts",
  GET_MY_REWARDS_PENDING_INVOICE = "/api/v1/me/rewards/pending-invoice",
  PROJECT_REWARD = "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}",
  GET_PUBLIC_USER_PROFILE = "/api/v1/users/{{id}}",
  GET_PUBLIC_USER_PROFILE_BY_LOGIN = "/api/v1/users/login/{{id}}",
  GET_PROJECT_REWARD_ITEMS = "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}/reward-items",
  GET_PROJECT_BUDGETS = "/api/v1/projects/{{projectId}}/budgets",
  PROJECT_REWARDS = "/api/v1/projects/{{id}}/rewards",
}
