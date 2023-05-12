resource "heroku_formation" "dusty_bot_web" {
  app      = module.dusty_bot.app.name
  type     = "web"
  size     = "Basic"
  quantity = 1
}

resource "heroku_formation" "dusty_bot_action_dequeuer" {
  app      = module.dusty_bot.app.name
  type     = "action-dequeuer"
  size     = "Basic"
  quantity = 1
}
