use std::sync::Arc;

use ::infrastructure::{
	config, github,
	tracing::{self, Tracer},
};
use anyhow::Result;
use dotenv::dotenv;

#[macro_use]
extern crate rocket;

mod domain;
mod infrastructure;
mod presentation;

use serde::Deserialize;

use self::{github::RoundRobinClient, presentation::http};

#[derive(Deserialize, Clone)]
pub struct Config {
	http: ::presentation::http::Config,
	tracer: tracing::Config,
	github: github::Config,
}

#[rocket::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/github-proxy/app.yaml")?;
	let _tracer = Tracer::init(&config.tracer, "github-proxy")?;

	let github = Arc::new(RoundRobinClient::new(&config.github)?);

	http::serve(config, github).await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
