variable "app_name" {
  type        = string
  description = "The name of the Heroku app"
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

variable "queue_billing_app" {
  type        = bool
  description = "Is the app the queue resource billing app?"
  default     = false
}

variable "database_id" {
  type        = string
  description = "The database addon id"
  default     = null
}

variable "queue_id" {
  type        = string
  description = "The queue addon id"
  default     = null
}

