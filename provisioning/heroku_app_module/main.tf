resource "heroku_app" "app" {
  name   = var.app_name
  region = "eu"
  organization {
    name = "onlydust"
  }
  stack      = var.stack
  buildpacks = var.buildpacks
  acm        = !var.worker
}

resource "heroku_pipeline_coupling" "coupling" {
  count    = var.pipeline_id != null ? 1 : 0
  app      = heroku_app.app.id
  pipeline = var.pipeline_id
  stage    = var.stage
}

resource "heroku_addon" "database" {
  count = var.database_billing_app ? 1 : 0
  app   = heroku_app.app.name
  plan  = var.postgres_plan
}

resource "heroku_addon" "amqp" {
  count = var.amqp_billing_app ? 1 : 0
  app   = heroku_app.app.name
  plan  = var.rabbitmq_plan
}

resource "heroku_addon_attachment" "database_attachment" {
  count    = var.database_id != null || var.database_billing_app ? 1 : 0
  app_id   = heroku_app.app.id
  addon_id = var.database_id != null ? var.database_id : heroku_addon.database[0].id
  name     = "DATABASE"
}

resource "heroku_addon_attachment" "amqp_attachment" {
  count    = var.amqp_id != null || var.amqp_billing_app ? 1 : 0
  app_id   = heroku_app.app.id
  addon_id = var.amqp_id != null ? var.amqp_id : heroku_addon.amqp[0].id
  name     = "CLOUDAMQP"
}

resource "heroku_app_feature" "metadata" {
  app  = heroku_app.app.name
  name = "runtime-dyno-metadata"
}

resource "heroku_drain" "drain" {
  app           = heroku_app.app.id
  sensitive_url = "https://http-intake.logs.${var.datadog_site}/api/v2/logs/?dd-api-key=${var.datadog_api_key}&ddsource=heroku&env=${var.environment}&service=${var.app_name}&host=${var.app_domain}"
}

resource "heroku_domain" "domain" {
  count    = var.worker ? 0 : 1
  app      = heroku_app.app.id
  hostname = var.app_domain
}
