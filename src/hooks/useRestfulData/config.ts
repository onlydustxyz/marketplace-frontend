export enum ApiResourcePaths {
  GET_ALL_PROJECTS = "/api/v1/projects",
  GET_PROJECT_DETAILS = "/api/v1/projects/{{id}}",
  GET_PROJECT_DETAILS_SLUG = "/api/v1/projects/slug/{{id}}",
  GET_PROJECT_CONTRIBUTORS = "/api/v1/projects/{{id}}/contributors",
  GET_MY_REWARDS = "/api/v1/me/rewards",
  GET_PROJECT_REWARDS_LIST = "/api/v1/projects/{{id}}/rewards",
  GET_PROJECT_REWARD = "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}",
  GET_PAYOUT_INFO = "/api/v1/me/payout-info",
}
