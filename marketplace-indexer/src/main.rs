mod application;
mod domain;
mod infrastructure;

use crate::{application::IndexerBuilder, domain::*, infrastructure::ApibaraClient};
use dotenv::dotenv;
use marketplace_domain::*;
use marketplace_infrastructure::{database, event_webhook::EventWebHook, github, starknet};
use slog::{o, Drain, FnValue, Logger, Record};
use std::sync::Arc;

fn channel_size() -> usize {
	std::env::var("SLOG_CHANNEL_SIZE").unwrap_or_default().parse().unwrap_or(256)
}

fn get_root_logger() -> Logger {
	let drain = match std::env::var("LOGS") {
		Ok(logs) if &logs == "terminal" => slog_async::Async::new(slog_envlogger::new(
			slog_term::CompactFormat::new(slog_term::TermDecorator::new().stderr().build())
				.build()
				.fuse(),
		))
		.chan_size(channel_size())
		.build(),
		_ => slog_async::Async::new(slog_envlogger::new(
			slog_json::Json::new(std::io::stdout())
				.add_default_keys()
				.add_key_value(o!("location" => FnValue(move |record : &Record| {
						format!("{}:{}:{}", record.file(), record.line(), record.column())
					}),
				))
				.build()
				.fuse(),
		))
		.chan_size(channel_size())
		.build(),
	};
	slog_stdlog::init().unwrap();
	slog::Logger::root(drain.fuse(), o!("version" => env!("CARGO_PKG_VERSION")))
}

#[tokio::main]
async fn main() {
	dotenv().ok();
	let _global_logger_guard = slog_scope::set_global_logger(get_root_logger());
	_global_logger_guard.cancel_reset();
	github::Client::initialize();

	let apibara_client =
		Arc::new(ApibaraClient::default().await.expect("Unable to connect to Apibara server"));
	let reqwest_client = reqwest::Client::new();

	let database = Arc::new(database::Client::new(database::init_pool()));
	let github = Arc::new(github::Client::new());
	let uuid_generator = Arc::new(RandomUuidGenerator {});
	let starknet = Arc::new(starknet::Client::default());

	index_contributions_events(
		apibara_client.clone(),
		reqwest_client.clone(),
		database.clone(),
		github,
		uuid_generator,
		starknet,
	)
	.await
	.expect("Failed to index events");
}

fn contributions_contract_address() -> ContractAddress {
	let address =
		std::env::var("CONTRIBUTIONS_ADDRESS").expect("CONTRIBUTIONS_ADDRESS must be set");
	address.parse().expect("CONTRIBUTIONS_ADDRESS is not a valid contract address")
}

async fn index_contributions_events(
	apibara_client: Arc<ApibaraClient>,
	reqwest_client: reqwest::Client,
	database: Arc<database::Client>,
	github: Arc<github::Client>,
	uuid_generator: Arc<dyn UuidGenerator>,
	contributor_service: Arc<dyn ContributorService>,
) -> Result<(), IndexingServiceError> {
	let indexer = IndexerBuilder::new(apibara_client.clone())
		.network(Network::Starknet)
		.start_at_block(311611)
		.on_conflict_do_nothing()
		.filter(contributions_contract_address(), "")
		.build(
			std::env::var("INDEXER_NAME")
				.unwrap_or_else(|_| String::from("contribution-indexer"))
				.into(),
		)
		.await
		.expect("Unable to create the contribution indexer");

	let contribution_projector = ContributionProjector::new(database.clone(), github.clone());
	let application_projector = ApplicationProjector::new(database.clone(), uuid_generator);
	let project_projector = ProjectProjector::new(github.clone(), database.clone());
	let project_member_projector = ProjectMemberProjector::new(database.clone());
	let contributor_projector =
		ContributorProjector::new(github, database.clone(), contributor_service);

	let observer = BlockchainObserverComposite::new(vec![
		Arc::new(BlockchainLogger::default()),
		Arc::new(EventStoreObserver::new(database.clone(), database)),
		Arc::new(EventListenersObserver::new(vec![
			Box::new(contribution_projector),
			Box::new(application_projector),
			Box::new(project_projector),
			Box::new(contributor_projector),
			Box::new(project_member_projector),
			Box::new(EventWebHook::new(reqwest_client)),
		])),
	]);

	apibara_client.fetch_new_events(&indexer, Arc::new(observer)).await
}
