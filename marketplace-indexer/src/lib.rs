mod domain;
mod infrastructure;
#[cfg(test)]
mod test;

use crate::{domain::*, infrastructure::apibara};
use dotenv::dotenv;
use log::{error, info};
use marketplace_domain::*;
use marketplace_infrastructure::{amqp::Bus, database, event_webhook::EventWebHook, github};
use std::sync::Arc;

pub async fn main() {
	dotenv().ok();
	github::Client::initialize();

	let database = Arc::new(database::Client::new(database::init_pool()));
	let event_store_bus = Bus::default().await.expect("Unable to connect to the event store bus");
	info!("🔗 Event store connected");

	let apibara_client = apibara::Client::new(
		apibara_node_url(),
		build_event_observer(database.clone(), event_store_bus),
		database.clone(),
	)
	.connect()
	.await
	.expect("Unable to connect to Apibara server");

	match IndexingService::observe_events(&apibara_client, database).await {
		Ok(()) => info!("Stream closed gracefully"),
		Err(error) => error!("Failed while streaming from apibara node: {error}"),
	};
}

fn apibara_node_url() -> String {
	std::env::var("APIBARA_NODE_URL").expect("APIBARA_NODE_URL must be set")
}

fn build_event_observer(
	database: Arc<database::Client>,
	event_store_bus: Bus,
) -> impl BlockchainObserver {
	let github = Arc::new(github::Client::new());
	let reqwest_client = reqwest::Client::new();

	let contribution_projector = ContributionProjector::new(database.clone(), github.clone());
	let application_projector = ApplicationProjector::new(database.clone());
	let project_projector = ProjectProjector::new(github.clone(), database.clone());
	let project_member_projector = ProjectMemberProjector::new(database.clone());
	let contributor_projector = ContributorWithGithubDataProjector::new(github, database.clone());
	let lead_contributors_projector = LeadContributorProjector::new(database.clone());

	BlockchainObserverComposite::new(vec![
		Arc::new(BlockchainLogger::default()),
		Arc::new(event_store_bus),
		Arc::new(EventStoreObserver::new(
			database.clone(),
			database.clone(),
			database.clone(),
		)),
		Arc::new(EventFilterRepositoryObserver::new(database)),
		Arc::new(EventListenersObserver::new(vec![
			Box::new(contribution_projector),
			Box::new(application_projector),
			Box::new(project_projector),
			Box::new(contributor_projector),
			Box::new(project_member_projector),
			Box::new(lead_contributors_projector),
			Box::new(EventWebHook::new(reqwest_client)),
		])),
	])
}
