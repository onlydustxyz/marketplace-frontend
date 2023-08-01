use infrastructure::{amqp, database, github, tracing};
use serde::Deserialize;

#[derive(Deserialize, Clone)]
pub struct Config {
	pub database: database::Config,
	pub amqp: amqp::Config,
	pub tracer: tracing::Config,
	pub github: github::Config,
}
