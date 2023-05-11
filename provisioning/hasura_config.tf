resource "heroku_config" "hasura" {
  vars           = var.hasura_config.vars
  sensitive_vars = var.hasura_config.sensitive_vars
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

variable "hasura_config" {
  description = "The hasura application configuration"
  type = object({
    vars = object({
      BACKEND_GRAPHQL_URL                             = string
      DUSTY_BOT_GRAPHQL_URL                           = string
      GITHUB_PROXY_GRAPHQL_URL                        = string
      HASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION        = string
      HASURA_GRAPHQL_ENABLE_CONSOLE                   = string
      HASURA_GRAPHQL_ENABLE_REMOTE_SCHEMA_PERMISSIONS = string
      HASURA_GRAPHQL_EXPERIMENTAL_FEATURES            = string
      HASURA_GRAPHQL_LOG_LEVEL                        = string
      HASURA_GRAPHQL_UNAUTHORIZED_ROLE                = string
    })
    sensitive_vars = object({
      BACKEND_GRAPHQL_API_KEY      = string
      DUSTY_BOT_GRAPHQL_API_KEY    = string
      GITHUB_PROXY_GRAPHQL_API_KEY = string
      HASURA_GRAPHQL_ADMIN_SECRET  = string
      HASURA_GRAPHQL_JWT_SECRET    = string
    })
  })
}
