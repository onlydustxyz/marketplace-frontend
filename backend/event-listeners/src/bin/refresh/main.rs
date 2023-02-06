use std::sync::Arc;

use ::infrastructure::config;
use anyhow::{anyhow, Result};
use clap::Parser;
use dotenv::dotenv;
use event_listeners::Config;
use infrastructure::{database, github, tracing::Tracer};

mod refresher;
use refresher::{Registrable, Registry};

mod cli;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/event-listeners/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "refresh")?;
	let database = Arc::new(database::Client::new(database::init_pool(
		config.database(),
	)?));
	let github = Arc::new(github::Client::new(config.github())?);

	let mut registry = Registry::new();

	refresher::project::create(database.clone(), github).register(&mut registry, "Project")?;
	refresher::payment::create(database).register(&mut registry, "Payment")?;

	let (aggregate_name, aggregate_id) = cli::Args::parse().dissolve();

	registry
		.get(&aggregate_name)
		.ok_or_else(|| anyhow!("Aggregate not found"))?
		.refresh(&aggregate_id)
		.await?;

	Ok(())
}
