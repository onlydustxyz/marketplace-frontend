resource "heroku_formation" "github_proxy_web" {
  app      = module.github_proxy.app.name
  type     = "web"
  size     = "Basic"
  quantity = 1
}
