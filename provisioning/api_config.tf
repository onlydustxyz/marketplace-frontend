resource "heroku_config" "api" {
  vars = {
    AWS_REGION                = "eu-west-1"
    DD_ENABLE_HEROKU_POSTGRES = "true"
    PROCFILE                  = "backend/api/Procfile"
    PROFILE                   = "production"
    ROCKET_CLI_COLORS         = "false"
    RUST_LOG                  = "info"
    GRAPHQL_BASE_URL          = local.hasura_graphql_url
    HASURA_GRAPHQL_ENDPOINT   = "https://${local.hasura_hostname}"
    ENV                       = var.environment
  }
  sensitive_vars = {
    AWS_ACCESS_KEY_ID           = var.aws_access_key_id
    AWS_SECRET_ACCESS_KEY       = var.aws_secret_access_key
    HASURA_GRAPHQL_ADMIN_SECRET = var.hasura_admin_secret
    INFURA_API_KEY              = var.infura_api_key
    BACKEND_GRAPHQL_API_KEY     = var.api_graphql_api_key
  }
}

resource "heroku_app_config_association" "api" {
  app_id         = module.api.app.id
  vars           = heroku_config.api.vars
  sensitive_vars = heroku_config.api.sensitive_vars
}

resource "heroku_app_config_association" "api_github" {
  app_id         = module.api.app.id
  vars           = heroku_config.github.vars
  sensitive_vars = heroku_config.github.sensitive_vars
}

resource "heroku_app_config_association" "api_datadog" {
  app_id         = module.api.app.id
  vars           = heroku_config.datadog.vars
  sensitive_vars = heroku_config.datadog.sensitive_vars
}

variable "api_hostname" {
  type    = string
  default = null
}

locals {
  api_hostname    = var.api_hostname != null ? var.api_hostname : "${var.environment}.api.onlydust.xyz"
  api_graphql_url = "https://${local.api_hostname}/graphql"
}

variable "aws_access_key_id" {
  type      = string
  sensitive = true
}

variable "aws_secret_access_key" {
  type      = string
  sensitive = true
}

variable "infura_api_key" {
  type      = string
  sensitive = true
}

variable "api_graphql_api_key" {
  type      = string
  sensitive = true
}
