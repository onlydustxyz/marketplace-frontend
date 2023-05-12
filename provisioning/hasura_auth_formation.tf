resource "heroku_formation" "hasura_auth_web" {
  app      = module.hasura_auth.app.name
  type     = "web"
  size     = "Basic"
  quantity = 1
}
