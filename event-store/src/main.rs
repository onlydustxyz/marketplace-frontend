use anyhow::Result;
use backend_infrastructure::tracing::Tracer;
use dotenv::dotenv;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let _tracer = Tracer::init("event_store")?;

	event_store::main().await
}
