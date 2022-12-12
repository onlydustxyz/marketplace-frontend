use derive_getters::Getters;
use infrastructure::{amqp, database, tracing};
use presentation::http;
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	http: http::Config,
	database: database::Config,
	amqp: amqp::Config,
	tracer: tracing::Config,
}
