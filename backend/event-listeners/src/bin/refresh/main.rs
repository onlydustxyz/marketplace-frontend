use ::infrastructure::config;
use anyhow::Result;
use dotenv::dotenv;
use event_listeners::Config;
use infrastructure::tracing::Tracer;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/event-listeners/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "refresh")?;

	Ok(())
}
