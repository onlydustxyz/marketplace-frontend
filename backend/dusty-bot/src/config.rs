use derive_getters::Getters;
use infrastructure::{amqp, github, tracing};
use presentation::http;
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	amqp: amqp::Config,
	http: http::Config,
	github: github::Config,
	tracer: tracing::Config,
}
