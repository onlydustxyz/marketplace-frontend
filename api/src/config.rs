use derive_getters::Getters;
use infrastructure::{amqp, database, graphql, tracing};
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	database: database::Config,
	amqp: amqp::Config,
	graphql: graphql::Config,
	tracer: tracing::Config,
}
