export enum ApiResourcePaths {
  GET_USER = "/api/v1/me",
  GET_ALL_PROJECTS = "/api/v1/projects",
  GET_PROJECT_DETAILS = "/api/v1/projects/{{id}}",
  GET_PROJECT_DETAILS_SLUG = "/api/v1/projects/slug/{{id}}",
  GET_PROJECT_CONTRIBUTORS = "/api/v1/projects/{{id}}/contributors",
  GET_MY_REWARDS = "/api/v1/me/rewards",
  GET_PROJECT_REWARDS_LIST = "/api/v1/projects/{{id}}/rewards",
  GET_PROJECT_REWARD = "/api/v1/projects/{{projectId}}/rewards/{{rewardId}}",
  GET_PAYOUT_INFO = "/api/v1/me/payout-info",
  GET_PUBLIC_USER_PROFILE = "/api/v1/users/{{id}}",
  GET_PUBLIC_USER_PROFILE_BY_LOGIN = "/api/v1/users/login/{{id}}",
  GET_USER_PROFILE = "/api/v1/me",
}
