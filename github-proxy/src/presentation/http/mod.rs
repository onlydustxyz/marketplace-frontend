use crate::domain::GithubService;
use anyhow::Result;
use infrastructure::github;
use rocket::{Build, Rocket};
use std::sync::Arc;

mod config;
mod routes;

pub async fn serve(github_client: Arc<github::Client>) -> Result<()> {
	let _ = inject_app(rocket::custom(config::get()), github_client)
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

fn inject_app(rocket: Rocket<Build>, github_service: Arc<dyn GithubService>) -> Rocket<Build> {
	rocket.manage(github_service)
}
