output "app" {
  description = "The app"
  value       = heroku_app.app
}

output "database_id" {
  description = "The id of the created database addon, if any"
  value       = var.database_billing_app ? heroku_addon.database[0].id : null
}

output "amqp_id" {
  description = "The id of the created amqp addon, if any"
  value       = var.amqp_billing_app ? heroku_addon.amqp[0].id : null
}

