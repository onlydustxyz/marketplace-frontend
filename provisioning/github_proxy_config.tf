resource "heroku_config" "github_proxy" {
  vars = {
    PROCFILE                           = "backend/github-proxy/Procfile"
    PROFILE                            = "production"
    RUST_LOG                           = "info"
    ROCKET_CLI_COLORS                  = "false"
    GITHUB_REVERSE_PROXY_CACHE_CONTROL = "public, max-age=600, s-maxage=600, stale-while-revalidate=3600, stale-if-error=666"
    ENV                                = var.environment
  }
  sensitive_vars = {
    GITHUB_PROXY_GRAPHQL_API_KEY = var.github_proxy_graphql_api_key
  }
}

resource "heroku_app_config_association" "github_proxy" {
  app_id         = module.github_proxy.app.id
  vars           = heroku_config.github_proxy.vars
  sensitive_vars = heroku_config.github_proxy.sensitive_vars
}

resource "heroku_app_config_association" "github_proxy_github" {
  app_id         = module.github_proxy.app.id
  vars           = heroku_config.github.vars
  sensitive_vars = heroku_config.github.sensitive_vars
}

resource "heroku_app_config_association" "github_proxy_datadog" {
  app_id         = module.github_proxy.app.id
  vars           = heroku_config.datadog.vars
  sensitive_vars = heroku_config.datadog.sensitive_vars
}

variable "github_proxy_graphql_api_key" {
  type      = string
  sensitive = true
}

variable "github_proxy_hostname" {
  type    = string
  default = null
}

locals {
  github_proxy_hostname    = var.github_proxy_hostname != null ? var.github_proxy_hostname : "${var.environment}.github.onlydust.xyz"
  github_proxy_graphql_url = "https://${local.github_proxy_hostname}/graphql"
}
