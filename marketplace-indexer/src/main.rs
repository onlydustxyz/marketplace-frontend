mod application;
mod domain;
mod infrastructure;

use crate::{application::IndexerBuilder, domain::*, infrastructure::ApibaraClient};
use dotenv::dotenv;
use marketplace_domain::ContractAddress;
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

	let apibara_client =
		Arc::new(ApibaraClient::default().await.expect("Unable to connect to Apibara server"));

	let indexer = IndexerBuilder::new(apibara_client.clone())
		.network(Network::Starknet)
		.start_at_block(0)
		.on_conflict_recreate()
		.filter(registry_contract_address(), "GithubIdentifierRegistered")
		.filter(registry_contract_address(), "GithubIdentifierUnregistered")
		.build("github_registration-indexer".into())
		.await
		.expect("Unable to create the indexer");

	apibara_client
		.fetch_new_events(&indexer, Arc::new(BlockchainLogger::default()))
		.await
		.expect("Error while fetching events");
}

fn registry_contract_address() -> ContractAddress {
	let address = std::env::var("REGISTRY_ADDRESS").expect("REGISTRY_ADDRESS must be set");
	address.parse().expect("REGISTRY_ADDRESS is not a valid contract address")
}
