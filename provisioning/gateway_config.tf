resource "heroku_config" "gateway" {
  vars = var.gateway_config.vars
}

resource "heroku_app_config_association" "gateway" {
  app_id = module.gateway.app.id
  vars   = heroku_config.gateway.vars
}

variable "gateway_config" {
  description = "The gateway application configuration"
  type = object({
    vars = object({
      OD_API_HOST         = string
      OD_GATEWAY_BASE_URL = string
    })
  })
}
