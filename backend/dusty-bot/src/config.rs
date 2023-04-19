use derive_getters::Getters;
use infrastructure::{amqp, github, tracing};
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	amqp: amqp::Config,
	tracer: tracing::Config,
	github: github::Config,
}
