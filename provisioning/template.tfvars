event_listeners_config = {
  vars = {
    PROCFILE                     = "backend/event-listeners/Procfile"
    PROFILE                      = "production"
    RUST_LOG                     = "info"
    ROCKET_CLI_COLORS            = "false"
    GITHUB_MAX_CALLS_PER_REQUEST = "500"
  }
}

github_proxy_config = {
  vars = {
    PROCFILE                           = "backend/github-proxy/Procfile"
    PROFILE                            = "production"
    RUST_LOG                           = "info"
    ROCKET_CLI_COLORS                  = "false"
    GITHUB_REVERSE_PROXY_CACHE_CONTROL = "public, max-age=600, s-maxage=600, stale-while-revalidate=3600, stale-if-error=666"
  }
  sensitive_vars = {
    GITHUB_PROXY_GRAPHQL_API_KEY = "op://tech/backend/$APP_ENV/github-proxy-graphql-api-key"
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

hasura_auth_config = {
  vars = {
    AUTH_CLIENT_URL                 = "https://develop.app.onlydust.xyz/login"
    AUTH_JWT_CUSTOM_CLAIMS          = "{\"projectsLeaded\":\"projectsLeaded[].projectId\",\"githubUserId\":\"githubUser.githubUserId\",\"githubAccessToken\":\"githubUser.accessToken\"}"
    AUTH_LOG_LEVEL                  = "info"
    AUTH_PROVIDER_GITHUB_ENABLED    = "true"
    AUTH_SERVER_URL                 = "https://develop.auth.onlydust.xyz"
    AUTH_USER_DEFAULT_ALLOWED_ROLES = "me,public,registered_user"
    AUTH_USER_DEFAULT_ROLE          = "registered_user"
    HASURA_GRAPHQL_GRAPHQL_URL      = "https://develop.hasura.onlydust.xyz/v1/graphql"
    NODE_ENV                        = "development"
  }
  sensitive_vars = {
    AUTH_PROVIDER_GITHUB_CLIENT_ID     = "op://tech/hasura auth/$APP_ENV/github-client-id"
    AUTH_PROVIDER_GITHUB_CLIENT_SECRET = "op://tech/hasura auth/$APP_ENV/github-client-secret"
    HASURA_GRAPHQL_ADMIN_SECRET        = "op://tech/hasura/$APP_ENV/admin-secret"
    HASURA_GRAPHQL_JWT_SECRET          = "op://tech/hasura/$APP_ENV/jwt-secret"
  }
}
