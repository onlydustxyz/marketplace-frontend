resource "heroku_config" "event_store" {
  vars = {
    PROCFILE          = "backend/event-store/Procfile"
    PROFILE           = "production"
    RUST_LOG          = "info"
    ROCKET_CLI_COLORS = "false"
  }
}

resource "heroku_app_config_association" "event_store" {
  app_id         = module.event_store.app.id
  vars           = heroku_config.event_store.vars
  sensitive_vars = heroku_config.event_store.sensitive_vars
}

resource "heroku_app_config_association" "event_store_datadog" {
  app_id         = module.event_store.app.id
  vars           = heroku_config.datadog.vars
  sensitive_vars = heroku_config.datadog.sensitive_vars
}
