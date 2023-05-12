resource "heroku_formation" "gateway_web" {
  app      = module.gateway.app.name
  type     = "web"
  size     = "Basic"
  quantity = 1
}
