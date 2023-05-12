provider "heroku" {
}

module "hasura" {
  source               = "./heroku_app_module"
  app_name             = "od-hasura-${var.environment}"
  app_domain           = local.hasura_hostname
  stage                = var.stage
  database_billing_app = true
  pipeline_id          = heroku_pipeline.hasura.id
  stack                = "container"
  datadog_api_key      = var.datadog_api_key
  datadog_site         = local.datadog_site
  environment          = var.environment
}

module "dusty_bot" {
  source          = "./heroku_app_module"
  app_name        = "od-dusty-bot-${var.environment}"
  app_domain      = local.dusty_bot_hostname
  stage           = var.stage
  amqp_id         = module.event_store.amqp_id
  pipeline_id     = heroku_pipeline.backend.id
  buildpacks      = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
  datadog_api_key = var.datadog_api_key
  datadog_site    = local.datadog_site
  environment     = var.environment
}

module "github_proxy" {
  source          = "./heroku_app_module"
  app_name        = "od-github-proxy-${var.environment}"
  app_domain      = local.github_proxy_hostname
  stage           = var.stage
  pipeline_id     = heroku_pipeline.backend.id
  buildpacks      = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
  datadog_api_key = var.datadog_api_key
  datadog_site    = local.datadog_site
  environment     = var.environment
}

module "event_store" {
  source           = "./heroku_app_module"
  app_name         = "od-event-store-${var.environment}"
  app_domain       = local.api_hostname
  stage            = var.stage
  database_id      = module.hasura.database_id
  amqp_billing_app = true
  pipeline_id      = heroku_pipeline.backend.id
  buildpacks       = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
  datadog_api_key  = var.datadog_api_key
  datadog_site     = local.datadog_site
  environment      = var.environment
  worker           = true
}

module "event_listeners" {
  source          = "./heroku_app_module"
  app_name        = "od-event-listeners-${var.environment}"
  app_domain      = local.api_hostname
  stage           = var.stage
  database_id     = module.hasura.database_id
  amqp_id         = module.event_store.amqp_id
  pipeline_id     = heroku_pipeline.backend.id
  buildpacks      = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
  datadog_api_key = var.datadog_api_key
  datadog_site    = local.datadog_site
  environment     = var.environment
  worker          = true
}

module "api" {
  source          = "./heroku_app_module"
  app_name        = "od-api-${var.environment}"
  app_domain      = local.api_hostname
  stage           = var.stage
  database_id     = module.hasura.database_id
  amqp_id         = module.event_store.amqp_id
  pipeline_id     = heroku_pipeline.backend.id
  buildpacks      = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
  datadog_api_key = var.datadog_api_key
  datadog_site    = local.datadog_site
  environment     = var.environment
}

module "gateway" {
  source          = "./heroku_app_module"
  app_name        = "od-gateway-${var.environment}"
  app_domain      = local.gateway_hostname
  stage           = var.stage
  pipeline_id     = heroku_pipeline.gateway.id
  stack           = "container"
  datadog_api_key = var.datadog_api_key
  datadog_site    = local.datadog_site
  environment     = var.environment
}

module "hasura_auth" {
  source          = "./heroku_app_module"
  app_name        = "od-hasura-auth-${var.environment}"
  app_domain      = local.hasura_auth_hostname
  stage           = var.stage
  database_id     = module.hasura.database_id
  pipeline_id     = heroku_pipeline.hasura_auth.id
  buildpacks      = ["https://github.com/unfold/heroku-buildpack-pnpm.git"]
  datadog_api_key = var.datadog_api_key
  datadog_site    = local.datadog_site
  environment     = var.environment
}

variable "environment" {
  type        = string
  description = "Name of the environment, among {develop, staging, production}"
}
