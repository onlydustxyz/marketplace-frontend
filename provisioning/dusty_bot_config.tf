resource "heroku_config" "dusty_bot" {
  vars = merge(
    local.datadog_config.vars,
    local.github_config.vars,
    local.dusty_bot_config.vars
  )
  sensitive_vars = merge(
    local.datadog_config.sensitive_vars,
    local.github_config.sensitive_vars,
    local.dusty_bot_config.sensitive_vars
  )
}

resource "heroku_app_config_association" "dusty_bot" {
  app_id         = module.dusty_bot.app.id
  vars           = heroku_config.dusty_bot.vars
  sensitive_vars = heroku_config.dusty_bot.sensitive_vars
}

locals {
  dusty_bot_config = {
    vars = {
      PROCFILE                    = "backend/dusty-bot/Procfile"
      PROFILE                     = "production"
      RUST_LOG                    = "info"
      DUSTY_BOT_THROTTLE_DURATION = "20"
    }
    sensitive_vars = {
      DUSTY_BOT_GRAPHQL_API_KEY = var.dusty_bot_graphql_api_key
    }
  }
}

variable "dusty_bot_graphql_api_key" {
  type      = string
  sensitive = true
}
