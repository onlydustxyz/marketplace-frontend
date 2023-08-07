use std::sync::Arc;

use ::infrastructure::config;
use anyhow::Result;
use dotenv::dotenv;
use dusty_bot::{presentation::http, Config};
use infrastructure::{github, tracing::Tracer};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/dusty-bot/app.yaml")?;
	let _tracer = Tracer::init(config.tracer, "dusty-bot")?;

	let github: Arc<github::Client> = github::RoundRobinClient::new(config.github)?.into();

	http::serve(config.http.clone(), github).await?;

	Ok(())
}
