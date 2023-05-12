resource "heroku_formation" "api_web" {
  app      = module.api.app.name
  type     = "web"
  size     = "Basic"
  quantity = 1
}

resource "heroku_formation" "api_events_sanity_checks" {
  app      = module.api.app.name
  type     = "events_sanity_checks"
  size     = "Basic"
  quantity = 0
}

resource "heroku_formation" "api_hasura" {
  app      = module.api.app.name
  type     = "hasura"
  size     = "Basic"
  quantity = 0
}
