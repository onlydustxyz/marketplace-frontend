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

use presentation::http;
use serde::Deserialize;

#[derive(Deserialize)]
struct Config {
	tracer: tracing::Config,
	github: github::Config,
}

#[rocket::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("github-proxy/app.yaml")?;
	let _tracer = Tracer::init(&config.tracer, "github-proxy")?;

	let github_client = Arc::new(github::Client::new(config.github)?);
	http::serve(github_client).await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
