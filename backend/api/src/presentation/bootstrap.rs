use std::sync::Arc;

use anyhow::Result;
use domain::AggregateRootRepository;
use infrastructure::{amqp, amqp::CommandPublisherDecorator, database, github};
use rocket::{Build, Rocket};

use crate::{
	infrastructure::{simple_storage, web3::ens},
	presentation::{graphql, http, http::github_client_pat_factory::GithubClientPatFactory},
	Config,
};

pub async fn bootstrap(config: Config) -> Result<Rocket<Build>> {
	info!("Bootstrapping backend api");
	let database = Arc::new(database::Client::new(database::init_pool(config.database)?));
	database.run_migrations()?;

	let github_api_client: Arc<github::Client> =
		github::RoundRobinClient::new(config.github_api_client.clone())?.into();
	let dusty_bot_api_client: Arc<github::Client> =
		github::RoundRobinClient::new(config.dusty_bot_api_client)?.into();
	let simple_storage = Arc::new(simple_storage::Client::new(config.s3).await?);
	let github_client_pat_factory = GithubClientPatFactory::new(config.github_api_client.clone());

	let rocket_build = http::serve(
		config.http,
		graphql::create_schema(),
		Arc::new(
			amqp::Bus::new(config.amqp.clone())
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
		github_api_client,
		dusty_bot_api_client,
		Arc::new(ens::Client::new(config.web3)?),
		simple_storage,
		Arc::new(amqp::Bus::new(config.amqp).await?),
		Arc::new(github_client_pat_factory),
	);
	Ok(rocket_build)
}

fn expected_processing_count_per_event() -> i32 {
	std::env::var("DOMAIN_EVENT_PROJECTORS_COUNT")
		.unwrap_or_default()
		.parse()
		.unwrap_or(2)
}
