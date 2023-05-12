resource "heroku_formation" "event_store" {
  app      = module.event_store.app.name
  type     = "event-store"
  size     = "Basic"
  quantity = 1
}
