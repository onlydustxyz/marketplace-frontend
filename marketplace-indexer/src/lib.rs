mod domain;
mod infrastructure;
#[cfg(test)]
mod test;

use crate::{
	domain::*,
	infrastructure::{apibara, heroku::client::HerokuClient},
};
use anyhow::Result;
use dotenv::dotenv;
use log::info;
use marketplace_infrastructure::{amqp::Bus, database, github};
use std::sync::Arc;

pub async fn main() -> Result<()> {
	dotenv().ok();

	github::Client::initialize();

	let database = Arc::new(database::Client::new(database::init_pool()?));

	let event_bus = Bus::default().await?;
	info!("🔗 Connected to message broker");

	let apibara_client = apibara::Client::new(
		apibara_node_url(),
		build_event_observer(database.clone(), event_bus),
		database.clone(),
	)
	.connect()
	.await?;
	info!("🔗 Connected to apibara node");

	IndexingService::observe_events(&apibara_client, database).await?;

	info!("👋 Stream closed gracefully");
	Ok(())
}

fn apibara_node_url() -> String {
	std::env::var("APIBARA_NODE_URL").expect("APIBARA_NODE_URL must be set")
}

fn build_event_observer(
	database: Arc<database::Client>,
	event_store_bus: Bus,
) -> impl BlockchainObserver {
	let indexer_service = HerokuClient::new().expect("Could not create indexer service");

	BlockchainObserverComposite::new(vec![
		Arc::new(BlockchainLogger::default()),
		Arc::new(event_store_bus),
		Arc::new(EventFilterRepositoryObserver::new(database)),
		Arc::new(IndexerObserver::new(Arc::new(indexer_service))),
	])
}
