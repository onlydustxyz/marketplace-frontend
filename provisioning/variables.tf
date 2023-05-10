variable "hasura_app_name" {
  type        = string
  description = "the name of the hasura app"
}

variable "dusty_bot_app_name" {
  type        = string
  description = "the name of the dusty_bot app"
}

variable "github_proxy_app_name" {
  type        = string
  description = "the name of the github_proxy app"
}

variable "event_store_app_name" {
  type        = string
  description = "the name of the event_store app"
}

variable "event_listeners_app_name" {
  type        = string
  description = "the name of the event_listeners app"
}

variable "api_app_name" {
  type        = string
  description = "The name of the api app"
}

variable "gateway_app_name" {
  type        = string
  description = "The name of the gateway app"
}

variable "hasura_auth_app_name" {
  type        = string
  description = "The name of the hasura_auth app"
}

variable "stage" {
  type        = string
  description = "The pipeline stage the workflow corresponds to"
}

variable "team_id" {
  type        = string
  description = "The Heroku team id"
}

variable "datadog_config" {
  description = "Datadog agent configuration"
  type = object({
    vars = object({
      DD_AGENT_MAJOR_VERSION = string
      DD_DYNO_HOST           = string
      DD_LOG_TO_CONSOLE      = string
      DD_SITE                = string
    })
    sensitive_vars = object({
      DD_API_KEY = string
    })
  })
}
