hasura_auth_config = {
  vars = {
    AUTH_CLIENT_URL                 = "https://develop.app.onlydust.xyz/login"
    AUTH_JWT_CUSTOM_CLAIMS          = "{\"projectsLeaded\":\"projectsLeaded[].projectId\",\"githubUserId\":\"githubUser.githubUserId\",\"githubAccessToken\":\"githubUser.accessToken\"}"
    AUTH_LOG_LEVEL                  = "info"
    AUTH_PROVIDER_GITHUB_ENABLED    = "true"
    AUTH_SERVER_URL                 = "https://develop.auth.onlydust.xyz"
    AUTH_USER_DEFAULT_ALLOWED_ROLES = "me,public,registered_user"
    AUTH_USER_DEFAULT_ROLE          = "registered_user"
    HASURA_GRAPHQL_GRAPHQL_URL      = "https://develop.hasura.onlydust.xyz/v1/graphql"
    NODE_ENV                        = "development"
  }
  sensitive_vars = {
    AUTH_PROVIDER_GITHUB_CLIENT_ID     = "op://tech/hasura auth/$APP_ENV/github-client-id"
    AUTH_PROVIDER_GITHUB_CLIENT_SECRET = "op://tech/hasura auth/$APP_ENV/github-client-secret"
    HASURA_GRAPHQL_ADMIN_SECRET        = "op://tech/hasura/$APP_ENV/admin-secret"
    HASURA_GRAPHQL_JWT_SECRET          = "op://tech/hasura/$APP_ENV/jwt-secret"
  }
}
