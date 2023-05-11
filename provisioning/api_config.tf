resource "heroku_config" "api" {
  vars           = merge(local.datadog_config.vars, var.api_config.vars)
  sensitive_vars = merge(local.datadog_config.sensitive_vars, var.api_config.sensitive_vars)
}

resource "heroku_app_config_association" "api" {
  app_id         = module.api.app.id
  vars           = heroku_config.api.vars
  sensitive_vars = heroku_config.api.sensitive_vars
}

variable "api_config" {
  description = "The API application configuration"
  type = object({
    vars = object({
      AWS_REGION                = string
      DD_ENABLE_HEROKU_POSTGRES = string
      GRAPHQL_BASE_URL          = string
      HASURA_GRAPHQL_ENDPOINT   = string
      PROCFILE                  = string
      PROFILE                   = string
      ROCKET_CLI_COLORS         = string
      RUST_LOG                  = string
      GITHUB_BASE_URL           = string
    })
    sensitive_vars = object({
      AWS_ACCESS_KEY_ID           = string
      AWS_SECRET_ACCESS_KEY       = string
      HASURA_GRAPHQL_ADMIN_SECRET = string
      INFURA_API_KEY              = string
      BACKEND_GRAPHQL_API_KEY     = string
      GITHUB_PAT                  = string
    })
  })
}
