use infrastructure::{amqp, database, github, http as http_client, tracing, web3};
use presentation::http as http_server;
use serde::Deserialize;

use crate::infrastructure::simple_storage;

#[derive(Debug, Clone, Deserialize)]
pub struct Config {
	pub http: http_server::Config,
	pub database: database::Config,
	pub amqp: amqp::Config,
	pub tracer: tracing::Config,
	pub github_api_client: github::Config,
	pub dusty_bot_api_client: github::Config,
	pub web3: web3::Config,
	pub s3: simple_storage::Config,
	pub indexer_client: http_client::Config,
}
