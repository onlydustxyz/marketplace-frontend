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

api_config = {
  vars = {
    AWS_ACCESS_KEY_ID       = "op://tech/aws/$APP_ENV/access-key-id"
    AWS_REGION              = "op://tech/aws/$APP_ENV/region"
    DD_AGENT_MAJOR_VERSION  = "op://tech/datadog/$APP_ENV/agent-major-version"
    DD_DYNO_HOST            = "op://tech/datadog/$APP_ENV/dyno-host"
    DD_LOG_TO_CONSOLE       = "op://tech/datadog/$APP_ENV/agent-major-version"
    DD_SITE                 = "op://tech/datadog/$APP_ENV/site"
    ENABLE_HEROKU_POSTGRES  = "true"
    GITHUB_BASE_URL         = "op://tech/github/$APP_ENV/base-url"
    GRAPHQL_BASE_URL        = "op://tech/hasura/$APP_ENV/graphql-base-url"
    HASURA_GRAPHQL_ENDPOINT = "op://tech/hasura/$APP_ENV/graphql-endpoint"
    PROCFILE                = "backend/api/Procfile"
    PROFILE                 = "production"
    ROCKET_CLI_COLORS       = "false"
    RUST_LOG                = "info"

  }
  sensitive_vars = {
    AWS_SECRET_ACCESS_KEY       = "op://tech/aws/$APP_ENV/secret-access-key"
    BACKEND_GRAPHQL_API_KEY     = "op://tech/backend/$APP_ENV/graphql-api-key"
    DD_API_KEY                  = "op://tech/datadog/$APP_ENV/api-key"
    GITHUB_PAT                  = "op://tech/github/$APP_ENV/personal-access-token"
    HASURA_GRAPHQL_ADMIN_SECRET = "op://tech/hasura/$APP_ENV/admin-secret"
    INFURA_API_KEY              = "op://tech/infura/$APP_ENV/api-key"
  }
}

