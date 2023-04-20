use std::sync::Arc;

use anyhow::Result;
use domain::GithubService;
use presentation::http;

use crate::{presentation::graphql, Config};

pub mod guards;
mod routes;

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
