use std::sync::Arc;

use anyhow::Result;
use presentation::http;

use crate::infrastructure::GithubServiceFactory;

pub mod guards;
mod routes;

pub async fn serve(
	http_config: http::Config,
	github_service_factory: Arc<GithubServiceFactory>,
) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/github-proxy/Rocket.toml"))
		.manage(http_config)
		.manage(github_service_factory)
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
