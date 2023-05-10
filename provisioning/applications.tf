provider "heroku" {
}

module "hasura" {
  source               = "./heroku_app_module"
  app_name             = var.hasura_app_name
  stage                = var.stage
  database_billing_app = true
  pipeline_id          = heroku_pipeline.hasura.id
  stack                = "container"
}

module "dusty_bot" {
  source      = "./heroku_app_module"
  app_name    = var.dusty_bot_app_name
  stage       = var.stage
  amqp_id     = module.event_store.amqp_id
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "github_proxy" {
  source      = "./heroku_app_module"
  app_name    = var.github_proxy_app_name
  stage       = var.stage
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "event_store" {
  source           = "./heroku_app_module"
  app_name         = var.event_store_app_name
  stage            = var.stage
  database_id      = module.hasura.database_id
  amqp_billing_app = true
  pipeline_id      = heroku_pipeline.backend.id
  buildpacks       = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "event_listeners" {
  source      = "./heroku_app_module"
  app_name    = var.event_listeners_app_name
  stage       = var.stage
  database_id = module.hasura.database_id
  amqp_id     = module.event_store.amqp_id
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "api" {
  source      = "./heroku_app_module"
  app_name    = var.api_app_name
  stage       = var.stage
  database_id = module.hasura.database_id
  amqp_id     = module.event_store.amqp_id
  pipeline_id = heroku_pipeline.backend.id
  buildpacks  = ["https://github.com/onlydustxyz/heroku-buildpack-rust", "https://github.com/DataDog/heroku-buildpack-datadog.git#2.6", "https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/multi-procfile.tgz"]
}

module "gateway" {
  source      = "./heroku_app_module"
  app_name    = var.gateway_app_name
  stage       = var.stage
  pipeline_id = heroku_pipeline.gateway.id
  stack       = "container"
}

module "hasura_auth" {
  source      = "./heroku_app_module"
  app_name    = var.hasura_auth_app_name
  stage       = var.stage
  database_id = module.hasura.database_id
  pipeline_id = heroku_pipeline.hasura_auth.id
  buildpacks  = ["https://github.com/unfold/heroku-buildpack-pnpm.git"]
}

