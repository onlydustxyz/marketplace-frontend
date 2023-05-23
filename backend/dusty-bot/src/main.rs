/// Imports the necessary modules for the dusty-bot application to run.
use std::sync::Arc;
use ::infrastructure::config;
use anyhow::Result;
use dotenv::dotenv;
use dusty_bot::{presentation::http, Config};
use infrastructure::{github, tracing::Tracer};

/// Runs the dusty-bot application asynchronously.
#[tokio::main]
async fn main() -> Result<()> {
    // Loads environment variables from .env file in project root directory.
	dotenv().ok();
    // Loads application configuration from backend/dusty-bot/app.yaml file.
	let config: Config = config::load("backend/dusty-bot/app.yaml")?;
    // Initializes tracing with tracing client and service name.
	let _tracer = Tracer::init(config.tracer(), "dusty-bot")?;
    // Creates an instance of the RoundRobinClient struct and wraps it in an Arc to share between tasks.
	let github = Arc::new(github::RoundRobinClient::new(config.github())?.into());
    // Serves HTTP requests with the given host and port and the wrapped github client.
	http::serve(config.http().clone(), github).await?;
	Ok(())
}