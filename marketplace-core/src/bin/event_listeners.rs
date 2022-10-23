use anyhow::Result;
use dotenv::dotenv;
use marketplace_infrastructure::tracing::{setup_tracing, teardown_tracing};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	setup_tracing()?;

	marketplace_core::event_listeners_main().await?;

	teardown_tracing();

	Ok(())
}
