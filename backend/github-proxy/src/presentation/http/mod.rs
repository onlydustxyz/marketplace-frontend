use std::sync::Arc;

use anyhow::Result;
use presentation::http;

use crate::domain::GithubService;

mod reverse_proxy_dto;
pub use reverse_proxy_dto::Config as ReverseProxyConfig;

mod routes;

pub async fn serve(
	http_config: http::Config,
	reverse_proxy_config: ReverseProxyConfig,
	github_service: Arc<dyn GithubService>,
) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/github-proxy/Rocket.toml"))
		.manage(http_config)
		.manage(reverse_proxy_config)
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
