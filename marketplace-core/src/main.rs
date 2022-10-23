use anyhow::Result;
use dotenv::dotenv;
use marketplace_infrastructure::tracing::{setup_tracing, teardown_tracing};

extern crate rocket;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();

	setup_tracing()?;
	marketplace_core::main().await?;

	teardown_tracing();

	Ok(())
}
