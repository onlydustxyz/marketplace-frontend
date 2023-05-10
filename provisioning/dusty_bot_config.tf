resource "heroku_config" "dusty_bot" {
  vars           = merge(var.common_config.vars, var.dusty_bot_config.vars)
  sensitive_vars = merge(var.common_config.sensitive_vars, var.dusty_bot_config.sensitive_vars)
}

resource "heroku_app_config_association" "dusty_bot" {
  app_id         = module.dusty_bot.app.id
  vars           = heroku_config.dusty_bot.vars
  sensitive_vars = heroku_config.dusty_bot.sensitive_vars
}

variable "dusty_bot_config" {
  description = "The dusty-bot application configuration"
  type = object({
    vars = object({
      DUSTY_BOT_THROTTLE_DURATION = string
      PROCFILE                    = string
      PROFILE                     = string
      RUST_LOG                    = string
    })
    sensitive_vars = object({
      DUSTY_BOT_GRAPHQL_API_KEY = string
    })
  })
}
