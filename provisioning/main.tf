provider "heroku" {
}

module "hasura" {
  source               = "./heroku_app_module"
  app_name             = var.hasura_app_name
  database_billing_app = true
}

module "dusty_bot" {
  source   = "./heroku_app_module"
  app_name = var.dusty_bot_app_name
}

module "github_proxy" {
  source   = "./heroku_app_module"
  app_name = var.github_proxy_app_name
}

module "event_store" {
  source      = "./heroku_app_module"
  app_name    = var.event_store_app_name
  database_id = module.hasura.database_id
}

module "event_listeners" {
  source      = "./heroku_app_module"
  app_name    = var.event_listeners_app_name
  database_id = module.hasura.database_id
}

module "api" {
  source      = "./heroku_app_module"
  app_name    = var.api_app_name
  database_id = module.hasura.database_id
}


