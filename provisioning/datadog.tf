resource "heroku_config" "datadog" {
  vars = {
    DD_AGENT_MAJOR_VERSION = "7"
    DD_DYNO_HOST           = "true"
    DD_LOG_TO_CONSOLE      = "false"
    DD_SITE                = "datadoghq.eu"
  }
  sensitive_vars = {
    DD_API_KEY = var.datadog_api_key
  }
}

variable "datadog_api_key" {
  type      = string
  sensitive = true
}

