use anyhow::Result;
use dotenv::dotenv;
use marketplace_infrastructure::tracing::Tracer;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	github::Client::initialize();

	let _tracer = Tracer::init("event-queue-worker")?;
	event_listeners::main().await
}
