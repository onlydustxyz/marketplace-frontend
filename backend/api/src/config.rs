use infrastructure::{amqp, database, github, graphql, tracing, web3};
use presentation::http;
use serde::Deserialize;

use crate::infrastructure::simple_storage;

#[derive(Deserialize)]
pub struct Config {
	pub http: http::Config,
	pub database: database::Config,
	pub amqp: amqp::Config,
	pub tracer: tracing::Config,
	pub github: github::Config,
	pub web3: web3::Config,
	pub s3: simple_storage::Config,
	pub graphql_client: graphql::Config,
}
