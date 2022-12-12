use crate::domain::GithubService;
use anyhow::Result;
use presentation::http;
use std::sync::Arc;

mod routes;

pub async fn serve(config: http::Config, github_service: Arc<dyn GithubService>) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/github-proxy/Rocket.toml"))
		.manage(config)
		.manage(github_service)
		.mount("/", routes![http::routes::health_check,])
		.mount(
			"/",
			routes![
				routes::graphql::graphiql,
				routes::graphql::get,
				routes::graphql::post
			],
		)
		.launch()
		.await?;
	Ok(())
}
