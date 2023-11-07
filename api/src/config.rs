use infrastructure::{amqp, coinmarketcap, dbclient, github, http as http_client, tracing, web3};
use presentation::http as http_server;
use serde::Deserialize;

use crate::infrastructure::simple_storage;

#[derive(Debug, Clone, Deserialize, Default)]
pub struct Config {
	#[serde(default)]
	pub http: http_server::Config,
	#[serde(default)]
	pub database: dbclient::Config,
	#[serde(default)]
	pub amqp: amqp::Config,
	#[serde(default)]
	pub tracer: tracing::Config,
	#[serde(default)]
	pub github_api_client: github::Config,
	#[serde(default)]
	pub dusty_bot_api_client: github::Config,
	#[serde(default)]
	pub web3: web3::Config,
	#[serde(default)]
	pub s3: simple_storage::Config,
	#[serde(default)]
	pub indexer_client: http_client::Config,
	#[serde(default)]
	pub new_indexer_client: http_client::Config,
	#[serde(default)]
	pub coinmarketcap: coinmarketcap::Config,
}
