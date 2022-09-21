mod domain;
mod infrastructure;
#[cfg(test)]
mod test;

use crate::{domain::*, infrastructure::apibara};
use dotenv::dotenv;
use infrastructure::single_contract::SingleContract;
use log::{error, info};
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
	let global_logger_guard = slog_scope::set_global_logger(get_root_logger());
	global_logger_guard.cancel_reset();
	github::Client::initialize();

	let database = Arc::new(database::Client::new(database::init_pool()));

	let apibara_client = apibara::Client::new(
		apibara_node_url(),
		build_event_observer(database.clone()),
		database,
	)
	.connect()
	.await
	.expect("Unable to connect to Apibara server");

	match IndexingService::observe_events(&apibara_client, Arc::new(SingleContract::default()))
		.await
	{
		Ok(()) => info!("Stream closed gracefully"),
		Err(error) => error!("Failed while streaming from apibara node: {error}"),
	};
}

fn apibara_node_url() -> String {
	std::env::var("APIBARA_NODE_URL").expect("APIBARA_NODE_URL must be set")
}

fn build_event_observer(database: Arc<database::Client>) -> impl BlockchainObserver {
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
