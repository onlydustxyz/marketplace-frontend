use std::sync::Arc;

use anyhow::Result;
use api::{
	infrastructure::simple_storage,
	presentation::{graphql, http},
	Config,
};
use domain::AggregateRootRepository;
use dotenv::dotenv;
use infrastructure::{
	amqp, amqp::CommandPublisherDecorator, config, database, github,
	graphql as infrastructure_graphql, tracing::Tracer, web3::ens,
};
use olog::info;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/api/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "api")?;

	let database = Arc::new(database::Client::new(database::init_pool(
		config.database(),
	)?));
	database.run_migrations()?;

	let github: github::Client = github::RoundRobinClient::new(config.github())?.into();
	let simple_storage = Arc::new(simple_storage::Client::new(config.s3()).await?);

	http::serve(
		config.http().clone(),
		graphql::create_schema(),
		Arc::new(
			amqp::Bus::new(config.amqp())
				.await?
				.into_command_publisher(database.clone(), expected_processing_count_per_event()),
		),
		AggregateRootRepository::new(database.clone()),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database,
		Arc::new(infrastructure_graphql::Client::new(
			config.graphql_client(),
		)?),
		Arc::new(github),
		Arc::new(ens::Client::new(config.web3())?),
		simple_storage,
		Arc::new(amqp::Bus::new(config.amqp()).await?),
	)
	.await?;

	info!("👋 Gracefully shut down");
	Ok(())
}

fn expected_processing_count_per_event() -> i32 {
	std::env::var("DOMAIN_EVENT_PROJECTORS_COUNT")
		.unwrap_or_default()
		.parse()
		.unwrap_or(2)
}
