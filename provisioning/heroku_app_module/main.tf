resource "heroku_app" "app" {
  name   = var.app_name
  region = "eu"
  organization {
    name = "onlydust"
  }
}

resource "heroku_addon" "database" {
  count = var.database_billing_app ? 1 : 0
  app   = heroku_app.app.name
  plan  = var.postgres_plan
}

resource "heroku_addon_attachment" "database_attachment" {
  count    = var.database_id != null ? 1 : 0
  app_id   = heroku_app.app.id
  addon_id = var.database_id
}
