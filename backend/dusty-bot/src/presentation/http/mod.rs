use std::sync::Arc;

use anyhow::Result;
use http::Config;
use infrastructure::github;
use presentation::http;

use crate::presentation::graphql;

mod routes;

pub async fn serve(config: Config, github: Arc<github::Client>) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/dusty-bot/Rocket.toml"))
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
