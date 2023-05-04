provider "heroku" {
}

resource "heroku_app" "api" {
  name = var.api_app_name
  region = "eu"
  organization {
    name = "onlydust"
  }
}

resource "heroku_app" "hasura" {
  name = var.hasura_app_name
  region = "eu"
  organization {
    name = "onlydust"
  }
}

resource "heroku_addon" "database" {
  app  = heroku_app.hasura.name
  plan = var.postgres_plan
}

