output "database_id" {
  description = "The id of the created database addon, if any"
  value       = var.database_billing_app ? heroku_addon.database[0].id : null
}

output "queue_id" {
  description = "The id of the created queue addon, if any"
  value       = var.queue_billing_app ? heroku_addon.queue[0].id : null
}

