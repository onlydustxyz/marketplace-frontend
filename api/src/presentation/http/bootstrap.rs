use std::sync::Arc;

use anyhow::Result;
use diesel_migrations::{embed_migrations, EmbeddedMigrations};
use domain::{AggregateRepository, CompositePublisher, EventPublisher};
use infrastructure::{
	amqp, dbclient, event_bus::EXCHANGE_NAME, github, http::Client as HttpClient,
};
use reqwest::header::HeaderMap;
use rocket::{Build, Rocket};

use crate::{
	domain::projectors::{self, new_indexer, projections},
	infrastructure::{simple_storage, web3::ens},
	presentation::{graphql, http, http::github_client_pat_factory::GithubClientPatFactory},
	Config,
};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("../migrations");

pub async fn bootstrap(config: Config) -> Result<Rocket<Build>> {
	info!("Bootstrapping api http server");
	let database = Arc::new(dbclient::Client::new(dbclient::init_pool(
		config.database.clone(),
	)?));
	database.run_migrations(MIGRATIONS)?;

	let github_api_client: Arc<github::Client> =
		github::RoundRobinClient::new(config.github_api_client.clone())?.into();
	let dusty_bot_api_client: Arc<github::Client> =
		github::RoundRobinClient::new(config.dusty_bot_api_client.clone())?.into();
	let simple_storage = Arc::new(simple_storage::Client::new(config.s3.clone()).await?);
	let github_client_pat_factory = GithubClientPatFactory::new(config.github_api_client.clone());
	let new_indexer_client = Arc::new(HttpClient::new(
		config.new_indexer_client.clone(),
		HeaderMap::default(),
	)?);

	let projector = projections::Projector::new(
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
	);

	let event_publisher = CompositePublisher::new(vec![
		Arc::new(EventPublisher::new(
			projectors::event_store::Projector::new(database.clone()),
		)),
		Arc::new(EventPublisher::new(projector.clone())),
		Arc::new(EventPublisher::new(new_indexer::Projector::new(
			new_indexer_client,
		))),
		Arc::new(
			amqp::Bus::new(config.amqp.clone())
				.await?
				.as_publisher(amqp::Destination::exchange(EXCHANGE_NAME)),
		),
	]);

	let rocket_build = http::serve(
		config.clone(),
		graphql::create_schema(),
		Arc::new(event_publisher),
		AggregateRepository::new(database.clone()),
		AggregateRepository::new(database.clone()),
		AggregateRepository::new(database.clone()),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		github_api_client.clone(),
		github_api_client,
		dusty_bot_api_client.clone(),
		dusty_bot_api_client,
		Arc::new(ens::Client::new(config.web3)?),
		simple_storage,
		Arc::new(github_client_pat_factory),
		database.clone(),
		database.clone(),
		database.clone(),
		database,
		projector,
	);
	Ok(rocket_build)
}
