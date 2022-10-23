use anyhow::Result;
use dotenv::dotenv;
use marketplace_infrastructure::tracing::Tracer;

extern crate rocket;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();

	let _tracer = Tracer::init("api")?;
	marketplace_core::main().await
}
