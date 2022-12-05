use anyhow::Result;
use dotenv::dotenv;
use infrastructure::tracing::Tracer;
use olog::{opentelemetry::trace::TraceContextExt, tracing_opentelemetry::OpenTelemetrySpanExt};

extern crate rocket;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();

	let _tracer = Tracer::init("api")?;
	{
		let span = tracing::span!(tracing::Level::INFO, "my span");
		let _enter = span.enter();
		let the_id =
			u128::from_be_bytes(span.context().span().span_context().trace_id().to_bytes()) as u64;
		olog::info!(the_id = the_id, "foooooooo");
	}

	olog::info!("baaaaaaar");

	api::main().await
}
