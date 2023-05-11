resource "heroku_config" "hasura" {
  vars           = local.hasura_config.vars
  sensitive_vars = local.hasura_config.sensitive_vars
}

resource "heroku_app_config_association" "hasura" {
  app_id         = module.hasura.app.id
  vars           = heroku_config.hasura.vars
  sensitive_vars = heroku_config.hasura.sensitive_vars
}

variable "hasura_hostname" {
  type    = string
  default = null
}

locals {
  hasura_hostname    = var.hasura_hostname != null ? var.hasura_hostname : "${var.environment}.hasura.onlydust.xyz"
  hasura_graphql_url = "https://${local.hasura_hostname}/v1/graphql"
}

variable "hasura_admin_secret" {
  type      = string
  sensitive = true
}

variable "hasura_jwt_secret" {
  type      = string
  sensitive = true
}

locals {
  hasura_config = {
    vars = {
      BACKEND_GRAPHQL_URL                             = local.api_graphql_url
      DUSTY_BOT_GRAPHQL_URL                           = local.dusty_bot_graphql_url
      GITHUB_PROXY_GRAPHQL_URL                        = local.github_proxy_graphql_url
      HASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION        = "graphql-default"
      HASURA_GRAPHQL_ENABLE_CONSOLE                   = "true"
      HASURA_GRAPHQL_ENABLE_REMOTE_SCHEMA_PERMISSIONS = "true"
      HASURA_GRAPHQL_EXPERIMENTAL_FEATURES            = "naming_convention"
      HASURA_GRAPHQL_LOG_LEVEL                        = "warn"
      HASURA_GRAPHQL_UNAUTHORIZED_ROLE                = "public"
    }
    sensitive_vars = {
      BACKEND_GRAPHQL_API_KEY      = var.api_graphql_api_key
      DUSTY_BOT_GRAPHQL_API_KEY    = var.dusty_bot_graphql_api_key
      GITHUB_PROXY_GRAPHQL_API_KEY = var.github_proxy_graphql_api_key
      HASURA_GRAPHQL_ADMIN_SECRET  = var.hasura_admin_secret
      HASURA_GRAPHQL_JWT_SECRET    = var.hasura_jwt_secret
    }
  }
}
