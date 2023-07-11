use std::sync::Arc;

use anyhow::Result;
use rocket::{Build, Rocket};

use domain::AggregateRootRepository;
use infrastructure::{
	amqp, amqp::CommandPublisherDecorator, database, github,
	graphql as infrastructure_graphql, web3::ens,
};

use crate::Config;
use crate::infrastructure::simple_storage;
use crate::presentation::graphql;
use crate::presentation::http::get_rocket_builder;

pub async fn bootstrap(config: Config) -> Result<Rocket<Build>> {
	let database = Arc::new(database::Client::new(database::init_pool(
		&config.database(),
	)?));
	database.run_migrations()?;

	let github: github::Client = github::RoundRobinClient::new(config.github())?.into();
	let simple_storage = Arc::new(simple_storage::Client::new(config.s3()).await?);

	let rocket_build = get_rocket_builder(
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
	).await;
	Ok(rocket_build)
}

fn expected_processing_count_per_event() -> i32 {
	std::env::var("DOMAIN_EVENT_PROJECTORS_COUNT")
		.unwrap_or_default()
		.parse()
		.unwrap_or(2)
}
