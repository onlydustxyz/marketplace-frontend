use infrastructure::{amqp, database, github, tracing};
use presentation::http;
use serde::Deserialize;

#[derive(Deserialize, Clone)]
pub struct Config {
	pub database: database::Config,
	pub amqp: amqp::Config,
	pub tracer: tracing::Config,
	pub github: github::Config,
	pub http: http::Config,
}
