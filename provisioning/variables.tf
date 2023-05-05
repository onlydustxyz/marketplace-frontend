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
  description = "The name of the API app"
}

variable "postgres_plan" {
  type        = string
  description = "The postgres addon plan"
  default     = "heroku-postgresql:standard-0"
}

