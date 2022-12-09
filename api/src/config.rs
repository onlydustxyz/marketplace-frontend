use derive_getters::Getters;
use infrastructure::{amqp, database, graphql, tracing};
use serde::Deserialize;

use crate::presentation::http;

#[derive(Deserialize, Getters)]
pub struct Config {
	http: http::Config,
	database: database::Config,
	amqp: amqp::Config,
	graphql: graphql::Config,
	tracer: tracing::Config,
}
