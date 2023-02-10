use std::sync::Arc;

use ::infrastructure::config;
use anyhow::{anyhow, Result};
use clap::Parser;
use dotenv::dotenv;
use event_listeners::Config;
use futures::future::try_join_all;
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

	let (aggregate_name, aggregate_ids, all_ids) = cli::Args::parse().dissolve();

	let refresher = registry.get(&aggregate_name).ok_or_else(|| anyhow!("Aggregate not found"))?;

	let aggregate_ids = match all_ids {
		true => refresher.all_ids()?,
		false => aggregate_ids,
	};

	let handles = aggregate_ids.iter().map(|id| refresher.refresh(id));

	try_join_all(handles).await?;

	Ok(())
}
