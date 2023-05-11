resource "heroku_pipeline" "backend" {
  name = "backend"

  owner {
    id   = var.heroku_team_id
    type = "team"
  }
}

resource "heroku_pipeline" "hasura" {
  name = "hasura"

  owner {
    id   = var.heroku_team_id
    type = "team"
  }
}

resource "heroku_pipeline" "gateway" {
  name = "gateway"

  owner {
    id   = var.heroku_team_id
    type = "team"
  }
}

resource "heroku_pipeline" "hasura_auth" {
  name = "hasura-auth"

  owner {
    id   = var.heroku_team_id
    type = "team"
  }
}
