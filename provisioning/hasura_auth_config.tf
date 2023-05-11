resource "heroku_config" "hasura_auth" {
  vars = {
    AUTH_CLIENT_URL                 = local.frontend_login_url
    AUTH_JWT_CUSTOM_CLAIMS          = "{\"projectsLeaded\":\"projectsLeaded[].projectId\",\"githubUserId\":\"githubUser.githubUserId\",\"githubAccessToken\":\"githubUser.accessToken\"}"
    AUTH_LOG_LEVEL                  = "info"
    AUTH_PROVIDER_GITHUB_ENABLED    = "true"
    AUTH_SERVER_URL                 = "https://${local.hasura_auth_hostname}"
    AUTH_USER_DEFAULT_ALLOWED_ROLES = "me,public,registered_user"
    AUTH_USER_DEFAULT_ROLE          = "registered_user"
    HASURA_GRAPHQL_GRAPHQL_URL      = local.hasura_graphql_url
    NODE_ENV                        = "development"
  }
  sensitive_vars = {
    AUTH_PROVIDER_GITHUB_CLIENT_ID     = var.github_app_client_id
    AUTH_PROVIDER_GITHUB_CLIENT_SECRET = var.github_app_client_secret
    HASURA_GRAPHQL_ADMIN_SECRET        = var.hasura_admin_secret
    HASURA_GRAPHQL_JWT_SECRET          = var.hasura_jwt_secret
  }
}

resource "heroku_app_config_association" "hasura_auth" {
  app_id         = module.hasura_auth.app.id
  vars           = heroku_config.hasura_auth.vars
  sensitive_vars = heroku_config.hasura_auth.sensitive_vars
}

variable "frontend_hostname" {
  type    = string
  default = null
}

variable "hasura_auth_hostname" {
  type    = string
  default = null
}

locals {
  frontend_hostname    = var.frontend_hostname != null ? var.frontend_hostname : "${var.environment}.app.onlydust.xyz"
  hasura_auth_hostname = var.hasura_auth_hostname != null ? var.hasura_auth_hostname : "${var.environment}.auth.onlydust.xyz"
  frontend_login_url   = "https://${local.frontend_hostname}/login"
}

variable "github_app_client_id" {
  type = string
}

variable "github_app_client_secret" {
  type      = string
  sensitive = true
}
