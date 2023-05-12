variable "app_name" {
  type        = string
  description = "The name of the Heroku app"
}

variable "app_domain" {
  type        = string
  description = "The hostname of the Heroku app"
}

variable "pipeline_id" {
  type        = string
  description = "The id of the pipeline the app is attached to"
  default     = null
}

variable "postgres_plan" {
  type        = string
  description = "The Heroku Postgres plan"
  default     = "heroku-postgresql:standard-0"
}

variable "rabbitmq_plan" {
  type        = string
  description = "The CloudAMQP plan"
  default     = "cloudamqp:lemur"
}

variable "database_billing_app" {
  type        = bool
  description = "Is the app the database resource billing app?"
  default     = false
}

variable "amqp_billing_app" {
  type        = bool
  description = "Is the app the amqp resource billing app?"
  default     = false
}

variable "database_id" {
  type        = string
  description = "The database addon id"
  default     = null
}

variable "amqp_id" {
  type        = string
  description = "The amqp addon id"
  default     = null
}

variable "stage" {
  type        = string
  description = "The pipeline stage of the apps"
}

variable "buildpacks" {
  type        = list(string)
  description = "The application buildpacks"
  default     = []
}

variable "stack" {
  type        = string
  description = "The application stack, between heroku-22 and container"
  default     = "heroku-22"
}

variable "datadog_api_key" {
  type = string
}

variable "datadog_site" {
  type = string
}

variable "environment" {
  type = string
}
