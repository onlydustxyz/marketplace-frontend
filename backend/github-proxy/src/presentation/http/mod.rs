use std::sync::Arc;

use anyhow::Result;
use presentation::http;

use crate::domain::GithubService;

mod dto;
mod routes;

pub async fn serve(config: http::Config, github_service: Arc<dyn GithubService>) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/github-proxy/Rocket.toml"))
		.manage(config)
		.manage(github_service)
		.mount("/", routes![http::routes::health_check,])
		.mount("/", routes![routes::github::get,])
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
