terraform {
  backend "s3" {
    bucket = "terraform-heroku-state"
    key    = "terraform/terraform.tfstate"
    region = "eu-west-1"
  }
}

