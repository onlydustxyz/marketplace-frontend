use anyhow::Result;
use dotenv::dotenv;
use infrastructure::tracing::Tracer;

#[macro_use]
extern crate rocket;

mod presentation;
use presentation::http;

#[rocket::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let _tracer = Tracer::init("api")?;

	http::serve().await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
