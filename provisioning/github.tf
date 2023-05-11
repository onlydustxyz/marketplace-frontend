resource "heroku_config" "github" {
  vars = {
    GITHUB_BASE_URL = local.github_base_url
  }
  sensitive_vars = {
    GITHUB_PAT = var.github_personal_access_token
  }
}

variable "github_base_url" {
  type    = string
  default = null
}

locals {
  github_base_url = var.github_base_url != null ? var.github_base_url : "https://${var.environment}.gateway.onlydust.xyz/github/"
}

variable "github_personal_access_token" {
  type      = string
  sensitive = true
}
