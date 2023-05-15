resource "heroku_config" "dusty_bot" {
  vars = {
    PROCFILE                    = "backend/dusty-bot/Procfile"
    PROFILE                     = "production"
    RUST_LOG                    = "info"
    DUSTY_BOT_THROTTLE_DURATION = "20"
    ENV                         = var.environment
  }
  sensitive_vars = {
    DUSTY_BOT_GRAPHQL_API_KEY = var.dusty_bot_graphql_api_key
  }
}

resource "heroku_app_config_association" "dusty_bot" {
  app_id         = module.dusty_bot.app.id
  vars           = heroku_config.dusty_bot.vars
  sensitive_vars = heroku_config.dusty_bot.sensitive_vars
}

resource "heroku_app_config_association" "dusty_bot_github" {
  app_id         = module.dusty_bot.app.id
  vars           = heroku_config.github.vars
  sensitive_vars = heroku_config.github.sensitive_vars
}

resource "heroku_app_config_association" "dusty_bot_datadog" {
  app_id         = module.dusty_bot.app.id
  vars           = heroku_config.datadog.vars
  sensitive_vars = heroku_config.datadog.sensitive_vars
}

variable "dusty_bot_graphql_api_key" {
  type      = string
  sensitive = true
}

variable "dusty_bot_hostname" {
  type    = string
  default = null
}

locals {
  dusty_bot_hostname    = var.dusty_bot_hostname != null ? var.dusty_bot_hostname : "${var.environment}.dustybot.onlydust.xyz"
  dusty_bot_graphql_url = "https://${local.dusty_bot_hostname}/graphql"
}
