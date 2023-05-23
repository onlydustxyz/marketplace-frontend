/// This module provides a function to serve a GraphQL API that proxies GitHub services.
///
/// It uses Rocket to handle HTTP requests and the `GithubService` trait to communicate with GitHub.
///
/// # Example
///
/// ```
/// use std::sync::Arc;
/// use anyhow::Result;
///
/// use crate::{Config, GithubService};
///
/// # mod domain { pub trait GithubService {} }
/// # mod presentation { pub mod http {} }
///
/// use presentation::graphql;
///
/// # mod guards {}
/// mod routes {}
///
/// # async fn serve() -> Result<()> {
/// let github: Arc<dyn GithubService> = unimplemented!();
///
/// let config = Config {
///     http: unimplemented!(),
///     github: unimplemented!(),
/// };
///
/// crate::serve(config, github).await?;
/// # Ok(())
/// # }
/// ```
pub async fn serve(config: Config, github: Arc<dyn GithubService>) -> Result<()> {
    let _ = rocket::custom(http::config::rocket("backend/github-proxy/Rocket.toml"))
        .manage(config.http.clone())
        .manage(config)
        .manage(graphql::create_schema())
        .manage(github)
        .mount("/", routes![http::routes::health_check,])
        .mount(
            "/",
            routes![
                routes::graphql::graphiql,
                routes::graphql::get_graphql_handler,
                routes::graphql::post_graphql_handler
            ],
        )
        .launch()
        .await?;
    Ok(())
}