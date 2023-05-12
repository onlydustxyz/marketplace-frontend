resource "heroku_formation" "hasura_web" {
  app      = module.hasura.app.name
  type     = "web"
  size     = "Basic"
  quantity = 1
}
