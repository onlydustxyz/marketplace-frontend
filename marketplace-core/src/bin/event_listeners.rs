use anyhow::Result;
use dotenv::dotenv;
use marketplace_infrastructure::tracing::Tracer;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();

	let _tracer = Tracer::init("event-queue-worker")?;
	marketplace_core::event_listeners::main().await
}
