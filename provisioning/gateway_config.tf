resource "heroku_config" "gateway" {
  vars = {
    OD_API_HOST         = local.hasura_hostname
    OD_GATEWAY_BASE_URL = "https://${local.gateway_hostname}"
  }
}

resource "heroku_app_config_association" "gateway" {
  app_id = module.gateway.app.id
  vars   = heroku_config.gateway.vars
}

variable "gateway_hostname" {
  type    = string
  default = null
}

locals {
  gateway_hostname = var.gateway_hostname != null ? var.gateway_hostname : "${var.environment}.gateway.onlydust.xyz"
}
