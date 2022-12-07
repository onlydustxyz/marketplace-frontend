use anyhow::Result;
use dotenv::dotenv;
use infrastructure::{
	config,
	tracing::{self, Tracer},
};

#[macro_use]
extern crate rocket;

mod presentation;
use presentation::http;
use serde::Deserialize;

#[derive(Deserialize)]
struct Config {
	tracer: tracing::Config,
}

#[rocket::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("github-proxy/app.yaml")?;
	let _tracer = Tracer::init(&config.tracer, "github-proxy")?;

	http::serve().await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
