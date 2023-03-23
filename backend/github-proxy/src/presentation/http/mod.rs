use anyhow::Result;
use presentation::http;

use crate::Config;

pub mod guards;
mod routes;

pub async fn serve(config: Config) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/github-proxy/Rocket.toml"))
		.manage(config.http.clone())
		.manage(config)
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
