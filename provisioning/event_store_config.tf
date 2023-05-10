resource "heroku_config" "event_store" {
  vars           = merge(var.datadog_config.vars, var.event_store_config.vars)
  sensitive_vars = var.datadog_config.sensitive_vars
}

resource "heroku_app_config_association" "event_store" {
  app_id         = module.event_store.app.id
  vars           = heroku_config.event_store.vars
  sensitive_vars = heroku_config.event_store.sensitive_vars
}

variable "event_store_config" {
  description = "The event-store application configuration"
  type = object({
    vars = object({
      PROCFILE          = string
      PROFILE           = string
      RUST_LOG          = string
      ROCKET_CLI_COLORS = string
    })
  })
}
