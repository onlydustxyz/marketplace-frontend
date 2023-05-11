resource "heroku_config" "event_store" {
  vars = merge(
    local.datadog_config.vars,
    local.event_store_config.vars
  )
  sensitive_vars = local.datadog_config.sensitive_vars
}

resource "heroku_app_config_association" "event_store" {
  app_id         = module.event_store.app.id
  vars           = heroku_config.event_store.vars
  sensitive_vars = heroku_config.event_store.sensitive_vars
}

locals {
  event_store_config = {
    vars = {
      PROCFILE          = "backend/event-store/Procfile"
      PROFILE           = "production"
      RUST_LOG          = "info"
      ROCKET_CLI_COLORS = "false"
    }
  }
}
