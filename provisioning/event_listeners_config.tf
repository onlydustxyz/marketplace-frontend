resource "heroku_config" "event_listeners" {
  vars           = merge(var.datadog_config.vars, var.event_listeners_config.vars)
  sensitive_vars = merge(var.datadog_config.sensitive_vars, var.event_listeners_config.sensitive_vars)
}

resource "heroku_app_config_association" "event_listeners" {
  app_id         = module.event_listeners.app.id
  vars           = heroku_config.event_listeners.vars
  sensitive_vars = heroku_config.event_listeners.sensitive_vars
}

variable "event_listeners_config" {
  description = "The event-listeners application configuration"
  type = object({
    vars = object({
      PROCFILE                     = string
      PROFILE                      = string
      RUST_LOG                     = string
      ROCKET_CLI_COLORS            = string
      GITHUB_BASE_URL              = string
      GITHUB_MAX_CALLS_PER_REQUEST = string
    })
    sensitive_vars = object({
      GITHUB_PAT = string
    })
  })
}
