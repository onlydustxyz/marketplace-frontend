use infrastructure::{amqp, github, tracing};
use presentation::http;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Config {
	pub amqp: amqp::Config,
	pub http: http::Config,
	pub github: github::Config,
	pub tracer: tracing::Config,
}
