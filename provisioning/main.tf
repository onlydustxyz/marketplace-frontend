provider "heroku" {
}

resource "heroku_pipeline" "backend" {
  name = "backend"

  owner {
    id   = var.team_id
    type = "team"
  }
}

resource "heroku_pipeline" "hasura" {
  name = "hasura"

  owner {
    id   = var.team_id
    type = "team"
  }
}

module "hasura" {
  source               = "./heroku_app_module"
  app_name             = var.hasura_app_name
  stage                = var.stage
  database_billing_app = true
  pipeline_id          = heroku_pipeline.hasura.id
}

module "dusty_bot" {
  source      = "./heroku_app_module"
  app_name    = var.dusty_bot_app_name
  stage       = var.stage
  queue_id    = module.event_store.queue_id
  pipeline_id = heroku_pipeline.backend.id
}

module "github_proxy" {
  source      = "./heroku_app_module"
  app_name    = var.github_proxy_app_name
  stage       = var.stage
  pipeline_id = heroku_pipeline.backend.id
}

module "event_store" {
  source            = "./heroku_app_module"
  app_name          = var.event_store_app_name
  stage             = var.stage
  database_id       = module.hasura.database_id
  queue_billing_app = true
  pipeline_id       = heroku_pipeline.backend.id
}

module "event_listeners" {
  source      = "./heroku_app_module"
  app_name    = var.event_listeners_app_name
  stage       = var.stage
  database_id = module.hasura.database_id
  queue_id    = module.event_store.queue_id
  pipeline_id = heroku_pipeline.backend.id
}

module "api" {
  source      = "./heroku_app_module"
  app_name    = var.api_app_name
  stage       = var.stage
  database_id = module.hasura.database_id
  queue_id    = module.event_store.queue_id
  pipeline_id = heroku_pipeline.backend.id
}


