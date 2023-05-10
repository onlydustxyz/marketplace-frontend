resource "heroku_config" "github_proxy" {
  vars           = merge(var.datadog_config.vars, var.github_proxy_config.vars)
  sensitive_vars = merge(var.datadog_config.sensitive_vars, var.github_proxy_config.sensitive_vars)
}

resource "heroku_app_config_association" "github_proxy" {
  app_id         = module.github_proxy.app.id
  vars           = heroku_config.github_proxy.vars
  sensitive_vars = heroku_config.github_proxy.sensitive_vars
}

variable "github_proxy_config" {
  description = "The github-proxy application configuration"
  type = object({
    vars = object({
      PROCFILE                           = string
      PROFILE                            = string
      RUST_LOG                           = string
      ROCKET_CLI_COLORS                  = string
      GITHUB_BASE_URL                    = string
      GITHUB_REVERSE_PROXY_CACHE_CONTROL = string
    })
    sensitive_vars = object({
      GITHUB_PAT                   = string
      GITHUB_PROXY_GRAPHQL_API_KEY = string
    })
  })
}
