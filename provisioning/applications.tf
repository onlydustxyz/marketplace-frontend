provider "heroku" {
}

module "hasura" {
  source               = "./heroku_app_module"
  app_name             = "od-hasura-${var.environment}"
  stage                = var.stage
  database_billing_app = true
  pipeline_id          = heroku_pipeline.hasura.id
  stack                = "container"
}

module "dusty_bot" {
  source      = "./heroku_app_module"
  app_name    = "od-dusty-bot-${var.environment}"
  stage       = var.stage
  amqp_id     = module.event_store.amqp_id
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "github_proxy" {
  source      = "./heroku_app_module"
  app_name    = "od-github-proxy-${var.environment}"
  stage       = var.stage
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "event_store" {
  source           = "./heroku_app_module"
  app_name         = "od-event-store-${var.environment}"
  stage            = var.stage
  database_id      = module.hasura.database_id
  amqp_billing_app = true
  pipeline_id      = heroku_pipeline.backend.id
  buildpacks       = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "event_listeners" {
  source      = "./heroku_app_module"
  app_name    = "od-event-listeners-${var.environment}"
  stage       = var.stage
  database_id = module.hasura.database_id
  amqp_id     = module.event_store.amqp_id
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "api" {
  source      = "./heroku_app_module"
  app_name    = "od-api-${var.environment}"
  stage       = var.stage
  database_id = module.hasura.database_id
  amqp_id     = module.event_store.amqp_id
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "gateway" {
  source      = "./heroku_app_module"
  app_name    = "od-gateway-${var.environment}"
  stage       = var.stage
  pipeline_id = heroku_pipeline.gateway.id
  stack       = "container"
}

module "hasura_auth" {
  source      = "./heroku_app_module"
  app_name    = "od-hasura-auth-${var.environment}"
  stage       = var.stage
  database_id = module.hasura.database_id
  pipeline_id = heroku_pipeline.hasura_auth.id
  buildpacks  = ["https://github.com/unfold/heroku-buildpack-pnpm.git"]
}

variable "environment" {
  type        = string
  description = "Name of the environment, among {develop, staging, production}"
}
