resource "heroku_config" "event_listeners" {
  vars = merge(
    local.datadog_config.vars,
    local.github_config.vars,
    local.event_listeners_config.vars
  )
  sensitive_vars = merge(
    local.datadog_config.sensitive_vars,
    local.github_config.sensitive_vars
  )
}

resource "heroku_app_config_association" "event_listeners" {
  app_id         = module.event_listeners.app.id
  vars           = heroku_config.event_listeners.vars
  sensitive_vars = heroku_config.event_listeners.sensitive_vars
}

locals {
  event_listeners_config = {
    vars = {
      PROCFILE                     = "backend/event-listeners/Procfile"
      PROFILE                      = "production"
      RUST_LOG                     = "info"
      ROCKET_CLI_COLORS            = "false"
      GITHUB_MAX_CALLS_PER_REQUEST = "500"
    }
  }
}
