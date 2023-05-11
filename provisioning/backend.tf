terraform {
  cloud {
    organization = "onlydust-marketplace"
    workspaces {
      name = "develop"
    }
  }
}

