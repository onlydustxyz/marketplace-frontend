resource "heroku_config" "event_listeners" {
  vars = {
    PROCFILE                     = "backend/event-listeners/Procfile"
    PROFILE                      = "production"
    RUST_LOG                     = "info"
    ROCKET_CLI_COLORS            = "false"
    GITHUB_MAX_CALLS_PER_REQUEST = "500"
    ENV                          = var.environment
  }
}

resource "heroku_app_config_association" "event_listeners" {
  app_id         = module.event_listeners.app.id
  vars           = heroku_config.event_listeners.vars
  sensitive_vars = heroku_config.event_listeners.sensitive_vars
}

resource "heroku_app_config_association" "event_listeners_github" {
  app_id         = module.event_listeners.app.id
  vars           = heroku_config.github.vars
  sensitive_vars = heroku_config.github.sensitive_vars
}

resource "heroku_app_config_association" "event_listeners_datadog" {
  app_id         = module.event_listeners.app.id
  vars           = heroku_config.datadog.vars
  sensitive_vars = heroku_config.datadog.sensitive_vars
}
