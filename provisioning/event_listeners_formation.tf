resource "heroku_formation" "event_listeners" {
  app      = module.event_listeners.app.name
  type     = "event-listeners"
  size     = "Basic"
  quantity = 1
}

resource "heroku_formation" "event_listeners_github_indexer" {
  app      = module.event_listeners.app.name
  type     = "github-indexer"
  size     = "Basic"
  quantity = 1
}

resource "heroku_formation" "event_listeners_refresh" {
  app      = module.event_listeners.app.name
  type     = "refresh"
  size     = "Basic"
  quantity = 0
}
