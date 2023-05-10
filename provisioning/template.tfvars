hasura_app_name          = "od-hasura-develop"
dusty_bot_app_name       = "od-dusty-bot-develop"
github_proxy_app_name    = "od-github-proxy-develop"
event_store_app_name     = "od-event-store-develop"
event_listeners_app_name = "od-event-listeners-develop"
api_app_name             = "od-api-develop"
gateway_app_name         = "od-gateway-develop"
hasura_auth_app_name     = "od-hasura-auth-develop"
stage                    = "development"
team_id                  = "f7679932-cfed-446d-96cc-74641c2ae407"

datadog_config = {
  vars = {
    DD_AGENT_MAJOR_VERSION = "7"
    DD_DYNO_HOST           = "true"
    DD_LOG_TO_CONSOLE      = "false"
    DD_SITE                = "datadoghq.eu"
  }
  sensitive_vars = {
    DD_API_KEY = "op://tech/datadog/$APP_ENV/api-key"
  }
}

api_config = {
  vars = {
    AWS_REGION                = "eu-west-1"
    DD_ENABLE_HEROKU_POSTGRES = "true"
    GRAPHQL_BASE_URL          = "https://develop.hasura.onlydust.xyz/v1/graphql"
    HASURA_GRAPHQL_ENDPOINT   = "https://develop.hasura.onlydust.xyz"
    PROCFILE                  = "backend/api/Procfile"
    PROFILE                   = "production"
    ROCKET_CLI_COLORS         = "false"
    RUST_LOG                  = "info"
    GITHUB_BASE_URL           = "https://develop.gateway.onlydust.xyz/github/"
  }
  sensitive_vars = {
    AWS_ACCESS_KEY_ID           = "op://tech/aws/$APP_ENV/access-key-id"
    AWS_SECRET_ACCESS_KEY       = "op://tech/aws/$APP_ENV/secret-access-key"
    BACKEND_GRAPHQL_API_KEY     = "op://tech/backend/$APP_ENV/api-graphql-api-key"
    HASURA_GRAPHQL_ADMIN_SECRET = "op://tech/hasura/$APP_ENV/admin-secret"
    INFURA_API_KEY              = "op://tech/infura/$APP_ENV/api-key"
    GITHUB_PAT                  = "op://tech/github/$APP_ENV/personal-access-token"
  }
}

dusty_bot_config = {
  vars = {
    PROCFILE                    = "backend/dusty-bot/Procfile"
    PROFILE                     = "production"
    RUST_LOG                    = "info"
    DUSTY_BOT_THROTTLE_DURATION = "20"
    GITHUB_BASE_URL             = "https://develop.gateway.onlydust.xyz/github/"
  }
  sensitive_vars = {
    DUSTY_BOT_GRAPHQL_API_KEY = "op://tech/backend/$APP_ENV/dusty-bot-graphql-api-key"
    GITHUB_PAT                = "op://tech/github/$APP_ENV/personal-access-token"
  }
}

event_store_config = {
  vars = {
    PROCFILE          = "backend/event-store/Procfile"
    PROFILE           = "production"
    RUST_LOG          = "info"
    ROCKET_CLI_COLORS = "false"
  }
}

event_listeners_config = {
  vars = {
    PROCFILE                     = "backend/event-listeners/Procfile"
    PROFILE                      = "production"
    RUST_LOG                     = "info"
    ROCKET_CLI_COLORS            = "false"
    GITHUB_BASE_URL              = "https://develop.gateway.onlydust.xyz/github/"
    GITHUB_MAX_CALLS_PER_REQUEST = "500"
  }
  sensitive_vars = {
    GITHUB_PAT = "op://tech/github/$APP_ENV/personal-access-token"
  }
}

github_proxy_config = {
  vars = {
    PROCFILE                           = "backend/github-proxy/Procfile"
    PROFILE                            = "production"
    RUST_LOG                           = "info"
    ROCKET_CLI_COLORS                  = "false"
    GITHUB_BASE_URL                    = "https://develop.gateway.onlydust.xyz/github/"
    GITHUB_REVERSE_PROXY_CACHE_CONTROL = "public, max-age=600, s-maxage=600, stale-while-revalidate=3600, stale-if-error=666"
  }
  sensitive_vars = {
    GITHUB_PAT                   = "op://tech/github/$APP_ENV/personal-access-token"
    GITHUB_PROXY_GRAPHQL_API_KEY = "op://tech/backend/$APP_ENV/github-proxy-graphql-api-key"
  }
}

gateway_config = {
  vars = {
    OD_API_HOST         = "develop.hasura.onlydust.xyz"
    OD_GATEWAY_BASE_URL = "https://develop.gateway.onlydust.xyz"
  }
}

hasura_config = {
  vars = {
    BACKEND_GRAPHQL_URL                             = "https://develop.api.onlydust.xyz/graphql"
    DUSTY_BOT_GRAPHQL_URL                           = "https://develop.dustybot.onlydust.xyz/graphql"
    GITHUB_PROXY_GRAPHQL_URL                        = "https://develop.github.onlydust.xyz/graphql"
    HASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION        = "graphql-default"
    HASURA_GRAPHQL_ENABLE_CONSOLE                   = "true"
    HASURA_GRAPHQL_ENABLE_REMOTE_SCHEMA_PERMISSIONS = "true"
    HASURA_GRAPHQL_EXPERIMENTAL_FEATURES            = "naming_convention"
    HASURA_GRAPHQL_LOG_LEVEL                        = "warn"
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE                = "public"
  }
  sensitive_vars = {
    BACKEND_GRAPHQL_API_KEY      = "op://tech/backend/$APP_ENV/api-graphql-api-key"
    DUSTY_BOT_GRAPHQL_API_KEY    = "op://tech/backend/$APP_ENV/dusty-bot-graphql-api-key"
    GITHUB_PROXY_GRAPHQL_API_KEY = "op://tech/backend/$APP_ENV/github-proxy-graphql-api-key"
    HASURA_GRAPHQL_ADMIN_SECRET  = "op://tech/hasura/$APP_ENV/admin-secret"
    HASURA_GRAPHQL_JWT_SECRET    = "op://tech/hasura/$APP_ENV/jwt-secret"
  }
}
