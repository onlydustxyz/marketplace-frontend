mod application;
mod domain;
mod infrastructure;

use crate::{application::IndexerBuilder, domain::*, infrastructure::ApibaraClient};
use dotenv::dotenv;
use marketplace_domain::*;
use marketplace_infrastructure::{database, github};
use slog::{o, Drain, Logger};
use std::sync::Arc;

fn get_root_logger() -> Logger {
	let drain = match std::env::var("LOGS") {
		Ok(logs) if &logs == "terminal" => slog_async::Async::default(slog_envlogger::new(
			slog_term::CompactFormat::new(slog_term::TermDecorator::new().stderr().build())
				.build()
				.fuse(),
		)),
		_ => slog_async::Async::default(slog_envlogger::new(
			slog_json::Json::new(std::io::stdout()).add_default_keys().build().fuse(),
		)),
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

	let indexer = IndexerBuilder::new(apibara_client.clone())
		.network(Network::Starknet)
		.start_at_block(311611)
		.on_conflict_do_nothing()
		.filter(contributions_contract_address(), "")
		.build("contribution-indexer".into())
		.await
		.expect("Unable to create the indexer");

	let database = Arc::new(database::Client::new(database::init_pool()));
	let github = Arc::new(github::Client::new());

	let contribution_observer = build_contribution_observers(database.clone(), github.clone());

	apibara_client
		.fetch_new_events(&indexer, contribution_observer)
		.await
		.expect("Error while fetching events");
}

fn contributions_contract_address() -> ContractAddress {
	let address =
		std::env::var("CONTRIBUTIONS_ADDRESS").expect("CONTRIBUTIONS_ADDRESS must be set");
	address.parse().expect("CONTRIBUTIONS_ADDRESS is not a valid contract address")
}

fn build_contribution_observers(
	database: Arc<database::Client>,
	github: Arc<github::Client>,
) -> Arc<dyn BlockchainObserver> {
	let confirmation_blocks_count = 1;

	let contribution_projector = ContributionProjector::new(database.clone(), github);

	let contribution_repository: Arc<dyn Repository<Contribution>> =
		Arc::new(RepositoryImplementation::new(database.clone()));
	let contribution_service = ContributionServiceImplementation::new(
		contribution_repository.clone(),
		database.clone(),
		database.clone(),
		Arc::new(RandomUuidGenerator),
	);

	let observer = BlockchainObserverComposite::new(vec![
		Arc::new(BlockchainLogger::default()),
		Arc::new(ContributionObserver::new(Arc::new(contribution_projector)))
			.confirmed(confirmation_blocks_count),
		Arc::new(ApplicationObserver::new(Arc::new(contribution_service)))
			.confirmed(confirmation_blocks_count),
		database.confirmed(confirmation_blocks_count),
	]);

	Arc::new(observer)
}
