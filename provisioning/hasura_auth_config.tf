resource "heroku_config" "hasura_auth" {
  vars           = var.hasura_auth_config.vars
  sensitive_vars = var.hasura_auth_config.sensitive_vars
}

resource "heroku_app_config_association" "hasura_auth" {
  app_id         = module.hasura_auth.app.id
  vars           = heroku_config.hasura_auth.vars
  sensitive_vars = heroku_config.hasura_auth.sensitive_vars
}

variable "hasura_auth_config" {
  description = "The hasura-auth application configuration"
  type = object({
    vars = object({
      AUTH_CLIENT_URL                 = string
      AUTH_JWT_CUSTOM_CLAIMS          = string
      AUTH_LOG_LEVEL                  = string
      AUTH_PROVIDER_GITHUB_ENABLED    = string
      AUTH_SERVER_URL                 = string
      AUTH_USER_DEFAULT_ALLOWED_ROLES = string
      AUTH_USER_DEFAULT_ROLE          = string
      HASURA_GRAPHQL_GRAPHQL_URL      = string
      NODE_ENV                        = string
    })
    sensitive_vars = object({
      AUTH_PROVIDER_GITHUB_CLIENT_ID     = string
      AUTH_PROVIDER_GITHUB_CLIENT_SECRET = string
      HASURA_GRAPHQL_ADMIN_SECRET        = string
      HASURA_GRAPHQL_JWT_SECRET          = string
    })
  })
}
