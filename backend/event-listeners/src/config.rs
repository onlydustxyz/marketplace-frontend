use derive_getters::Getters;
use infrastructure::{amqp, database, tracing};
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	database: database::Config,
	amqp: amqp::Config,
	tracer: tracing::Config,
}
