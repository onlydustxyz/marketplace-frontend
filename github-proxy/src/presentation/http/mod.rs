use crate::domain::GithubService;
use anyhow::Result;
use presentation::http;
use std::sync::Arc;

mod routes;

pub async fn serve(config: http::Config, github_service: Arc<dyn GithubService>) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("github-proxy/Rocket.toml"))
		.attach(http::guards::Cors)
		.manage(config)
		.manage(github_service)
		.mount(
			"/",
			routes![
				http::routes::options_preflight_handler,
				http::routes::health_check,
			],
		)
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
