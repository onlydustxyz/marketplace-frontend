use std::sync::Arc;

use ::infrastructure::config;
use anyhow::Result;
use dotenv::dotenv;
use dusty_bot::{
	presentation::{graphql, http},
	Config,
};
use infrastructure::{github, tracing::Tracer};
use tokio::task::JoinHandle;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/dusty-bot/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "dusty-bot")?;

	let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());

	spawn_web_server()?.await?;

	Ok(())
}

fn spawn_web_server() -> Result<JoinHandle<()>> {
	let web_server = http::server(http::port()?, graphql::Context::new);

	Ok(tokio::spawn(web_server))
}
