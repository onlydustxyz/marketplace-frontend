provider "heroku" {
}

resource "heroku_app" "api" {
  name = "od-api-develop"
  region = "eu"
  organization {
    name = "onlydust"
  }
}

resource "heroku_app" "hasura" {
  name = "od-hasura-develop"
  region = "eu"
  organization {
    name = "onlydust"
  }
}

resource "heroku_addon" "database" {
  app  = heroku_app.hasura.name
  plan = "heroku-postgresql:standard-0"
}

