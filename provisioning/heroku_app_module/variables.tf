variable "app_name" {
  type        = string
  description = "The name of the Heroku app"
}

variable "postgres_plan" {
  type        = string
  description = "The Heroku Postgres plan"
  default     = "heroku-postgresql:standard-0"
}

variable "database_billing_app" {
  type        = bool
  description = "Is the app the database resource billing app?"
  default     = false
}

variable "database_id" {
  type        = string
  description = "The database addon id"
  default     = ""
}

