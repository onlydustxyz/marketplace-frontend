use derive_getters::Getters;
use infrastructure::{amqp, database, github, tracing, web3};
use presentation::http;
use serde::Deserialize;

use crate::infrastructure::simple_storage;

#[derive(Deserialize, Getters)]
pub struct Config {
	http: http::Config,
	database: database::Config,
	amqp: amqp::Config,
	tracer: tracing::Config,
	github: github::Config,
	web3: web3::Config,
	s3: simple_storage::Config,
}
