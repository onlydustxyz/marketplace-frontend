output "database_id" {
  description = "The id of the created database addon, if any"
  value       = var.database_billing_app ? heroku_addon.database[0].id : null
}

