use anyhow::Result;
use dotenv::dotenv;
use infrastructure::tracing::Tracer;

extern crate rocket;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();

	let _tracer = Tracer::init("api")?;
	api::main().await
}
