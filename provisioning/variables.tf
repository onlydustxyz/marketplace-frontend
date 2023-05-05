variable "api_app_name" {
  type        = string
  description = "The name of the API app"
}

variable "hasura_app_name" {
  type        = string
  description = "The name of the Hasura app"
}

variable "postgres_plan" {
  type        = string
  description = "The postgres addon plan"
  default     = "heroku-postgresql:standard-0"
}

