//! This module contains a function for serving the Rocket application.
//!
//! The `serve` function is the entry point for the backend of the Dusty Bot application. It takes a `Config` object and a `github::Client` object, and returns a `Result` object indicating whether the Rocket application was successfully launched.
//!
//! # Example
//!
//! ```
//! use std::sync::Arc;
//! use anyhow::Result;
//! use http::Config;
//! use infrastructure::github;
//! use presentation::http;
//!
//! use crate::presentation::graphql;
//!
//! mod routes;
//!
//! # #[tokio::main]
//! # async fn main() -> Result<()> {
//! let config = Config::default();
//! let github_client = github::Client::new()?;
//! let github = Arc::new(github_client);
//!
//! let result = serve(config, github).await;
//!
//! assert!(result.is_ok());
//! # result
//! # }
//!
//! # async fn serve(config: Config, github: Arc<github::Client>) -> Result<()> {
//! #     let _ = rocket::custom(http::config::rocket("backend/dusty-bot/Rocket.toml"))
//! #         .manage(config)
//! #         .manage(graphql::create_schema())
//! #         .manage(github)
//! #         .mount("/", routes![http::routes::health_check,])
//! #         .mount(
//! #             "/",
//! #             routes![
//! #                 routes::graphql::graphiql,
//! #                 routes::graphql::get_graphql_handler,
//! #                 routes::graphql::post_graphql_handler
//! #             ],
//! #         )
//! #         .launch()
//! #         .await?;
//! #
//! #     Ok(())
//! # }
//! ```