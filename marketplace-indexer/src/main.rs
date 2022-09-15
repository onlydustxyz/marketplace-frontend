mod application;
mod domain;
mod infrastructure;

use crate::{application::IndexerBuilder, domain::*, infrastructure::ApibaraClient};
use dotenv::dotenv;
use futures::future::try_join_all;
use marketplace_domain::*;
use marketplace_infrastructure::{database, event_webhook::EventWebHook, github, starknet};
use slog::{o, Drain, FnValue, Logger, Record};
use std::sync::Arc;
use thiserror::Error;

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
	let global_logger_guard = slog_scope::set_global_logger(get_root_logger());
	global_logger_guard.cancel_reset();
	github::Client::initialize();

	let apibara_client =
		Arc::new(ApibaraClient::default().await.expect("Unable to connect to Apibara server"));

	// TODO: Remove this call once web3 migration is over
	build_legacy_indexer(apibara_client.clone()).await;

	let observer = build_event_observer();
	index_events(apibara_client.clone(), apibara_client, Arc::new(observer))
		.await
		.expect("Failed to index events");
}

fn contributions_contract_address() -> ContractAddress {
	let address =
		std::env::var("CONTRIBUTIONS_ADDRESS").expect("CONTRIBUTIONS_ADDRESS must be set");
	address.parse().expect("CONTRIBUTIONS_ADDRESS is not a valid contract address")
}

async fn build_legacy_indexer(apibara_client: Arc<ApibaraClient>) {
	IndexerBuilder::new(apibara_client.clone())
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
}

fn build_event_observer() -> impl BlockchainObserver {
	let database = Arc::new(database::Client::new(database::init_pool()));
	let github = Arc::new(github::Client::new());
	let uuid_generator = Arc::new(RandomUuidGenerator {});
	let starknet = Arc::new(starknet::Client::default());
	let reqwest_client = reqwest::Client::new();

	let contribution_projector = ContributionProjector::new(database.clone(), github.clone());
	let application_projector = ApplicationProjector::new(database.clone(), uuid_generator);
	let project_projector = ProjectProjector::new(github.clone(), database.clone());
	let project_member_projector = ProjectMemberProjector::new(database.clone());
	let contributor_projector = ContributorProjector::new(github, database.clone(), starknet);

	BlockchainObserverComposite::new(vec![
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
	])
}

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Repository(#[from] IndexerRepositoryError),
	#[error(transparent)]
	Service(#[from] IndexingServiceError),
}

async fn index_events(
	indexer_repository: Arc<dyn IndexerRepository>,
	indexing_service: Arc<dyn IndexingService>,
	observer: Arc<dyn BlockchainObserver>,
) -> Result<(), Error> {
	let indexers = indexer_repository.list().await?;

	try_join_all(
		indexers
			.into_iter()
			.map(|indexer| indexing_service.fetch_new_events(indexer, observer.clone())),
	)
	.await?;

	Ok(())
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;

	#[fixture]
	fn indexer_ids() -> Vec<IndexerId> {
		vec![
			String::from("indexer-1").into(),
			String::from("indexer-2").into(),
			String::from("indexer-3").into(),
		]
	}

	#[fixture]
	fn indexers(indexer_ids: Vec<IndexerId>) -> Vec<Indexer> {
		indexer_ids
			.into_iter()
			.map(|id| Indexer {
				id,
				..Default::default()
			})
			.collect()
	}

	#[fixture]
	fn indexer_repository() -> MockIndexerRepository {
		MockIndexerRepository::new()
	}

	#[fixture]
	fn indexing_service() -> MockIndexingService {
		MockIndexingService::new()
	}

	#[fixture]
	fn observer() -> MockBlockchainObserver {
		MockBlockchainObserver::new()
	}

	#[fixture]
	fn blockchain_observer() -> MockBlockchainObserver {
		MockBlockchainObserver::new()
	}

	#[rstest]
	async fn run_all_indexers(
		mut indexer_repository: MockIndexerRepository,
		mut indexing_service: MockIndexingService,
		indexers: Vec<Indexer>,
	) {
		let cloned_indexers = indexers.clone();
		indexer_repository.expect_list().times(1).return_once(|| Ok(cloned_indexers));

		for indexer in indexers {
			indexing_service
				.expect_fetch_new_events()
				.times(1)
				.with(eq(indexer), always())
				.returning(|_, _| Ok(()));
		}

		let result = index_events(
			Arc::new(indexer_repository),
			Arc::new(indexing_service),
			Arc::new(MockBlockchainObserver::new()),
		)
		.await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}
}
