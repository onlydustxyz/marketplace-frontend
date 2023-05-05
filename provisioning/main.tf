provider "heroku" {
}

module "api" {
  source      = "./heroku_app_module"
  app_name    = var.api_app_name
  database_id = module.hasura.database_id
}

module "hasura" {
  source               = "./heroku_app_module"
  app_name             = var.hasura_app_name
  database_billing_app = true
}

